import { getFirestore } from 'firebase-admin/firestore';

export class FirebaseService {
  protected readonly db = getFirestore();

  readonly logs = this.db.collection('logs');
}
