import { Injectable } from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

@Injectable()
export class FirebaseService {
  readonly auth = getAuth();
  readonly db = getFirestore();

  readonly logs = this.db.collection('logs');
}
