import { getFirestore } from 'firebase-admin/firestore';

export class FirebaseService {
  readonly db = getFirestore();

  constructor() {}
}
