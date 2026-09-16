import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { auth, db, googleProvider, testFirestoreConnection } from './firebase';
import { handleFirestoreError, OperationType } from './errors';

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'learner' | 'corporate_client' | 'trainer';
  createdAt: string;
  updatedAt: string;
}

export interface StoredCertificate {
  certificateId: string;
  userId: string;
  learnerName: string;
  learnerEmail?: string;
  programId?: string;
  programTitle: string;
  sector?: string;
  hoursCompleted?: number;
  score?: number;
  verificationCode: string;
  status: 'issued' | 'verified' | 'revoked';
  createdAt: string;
}

export interface StoredEvaluation {
  evaluationId: string;
  userId: string;
  participantName: string;
  participantEmail?: string;
  totalScore: number;
  percentage: number;
  calibratedLevel: string;
  dimensionsBreakdown?: string;
  createdAt: string;
}

export interface StoredInquiry {
  inquiryId: string;
  userId?: string;
  clientName: string;
  companyName: string;
  email: string;
  phone?: string;
  industry: string;
  targetLearners?: number;
  projectedRoiMultiplier?: number;
  message?: string;
  status: 'pending' | 'contacted' | 'scheduled' | 'closed';
  createdAt: string;
}

interface FirebaseContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  saveCertificate: (cert: Omit<StoredCertificate, 'userId' | 'createdAt'>) => Promise<void>;
  saveEvaluation: (evalData: Omit<StoredEvaluation, 'userId' | 'createdAt'>) => Promise<void>;
  saveInquiry: (inquiry: Omit<StoredInquiry, 'createdAt'>) => Promise<void>;
  certificates: StoredCertificate[];
  evaluations: StoredEvaluation[];
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [certificates, setCertificates] = useState<StoredCertificate[]>([]);
  const [evaluations, setEvaluations] = useState<StoredEvaluation[]>([]);

  // Initial connection test
  useEffect(() => {
    testFirestoreConnection();
  }, []);

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const path = `users/${currentUser.uid}`;

        try {
          const docSnap = await getDoc(userDocRef);
          const now = new Date().toISOString();

          if (docSnap.exists()) {
            const data = docSnap.data() as UserProfile;
            setUserProfile(data);
          } else {
            // Initialize new user profile document
            const newProfile: UserProfile = {
              userId: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || 'Learner',
              photoURL: currentUser.photoURL || undefined,
              role: 'learner',
              createdAt: now,
              updatedAt: now,
            };
            await setDoc(userDocRef, newProfile);
            setUserProfile(newProfile);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, path);
        }
      } else {
        setUserProfile(null);
        setCertificates([]);
        setEvaluations([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sync Certificates when user logs in
  useEffect(() => {
    if (!user) return;

    const certsRef = collection(db, 'certificates');
    const q = query(certsRef, where('userId', '==', user.uid));
    const path = 'certificates';

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: StoredCertificate[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as StoredCertificate);
        });
        setCertificates(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, path);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Sync Evaluations when user logs in
  useEffect(() => {
    if (!user) return;

    const evalRef = collection(db, 'evaluations');
    const q = query(evalRef, where('userId', '==', user.uid));
    const path = 'evaluations';

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: StoredEvaluation[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as StoredEvaluation);
        });
        setEvaluations(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, path);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Google Login popup
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Sign-in failed:', error);
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign-out failed:', error);
      throw error;
    }
  };

  // Save Certificate to Firestore
  const saveCertificate = async (cert: Omit<StoredCertificate, 'userId' | 'createdAt'>) => {
    if (!user) {
      throw new Error('Please sign in to save certificates to your profile.');
    }
    const path = `certificates/${cert.certificateId}`;
    try {
      const docRef = doc(db, 'certificates', cert.certificateId);
      const newCert: StoredCertificate = {
        ...cert,
        userId: user.uid,
        createdAt: new Date().toISOString(),
      };
      await setDoc(docRef, newCert);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  // Save Evaluation to Firestore
  const saveEvaluation = async (evalData: Omit<StoredEvaluation, 'userId' | 'createdAt'>) => {
    if (!user) {
      throw new Error('Please sign in to save your diagnostic assessment.');
    }
    const path = `evaluations/${evalData.evaluationId}`;
    try {
      const docRef = doc(db, 'evaluations', evalData.evaluationId);
      const newEval: StoredEvaluation = {
        ...evalData,
        userId: user.uid,
        createdAt: new Date().toISOString(),
      };
      await setDoc(docRef, newEval);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  // Save Inquiry to Firestore
  const saveInquiry = async (inquiry: Omit<StoredInquiry, 'createdAt'>) => {
    const path = `inquiries/${inquiry.inquiryId}`;
    try {
      const docRef = doc(db, 'inquiries', inquiry.inquiryId);
      const newInquiry: StoredInquiry = {
        ...inquiry,
        userId: user ? user.uid : undefined,
        createdAt: new Date().toISOString(),
      };
      await setDoc(docRef, newInquiry);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signInWithGoogle,
        logout,
        saveCertificate,
        saveEvaluation,
        saveInquiry,
        certificates,
        evaluations,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = (): FirebaseContextType => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
