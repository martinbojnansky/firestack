import { Module, Type } from '@nestjs/common';
import { Actions } from '../../api/actions';
import { ActionService } from './action.service';
import { CreateLogService } from './actions/create-log.service';
import { GetLogsService } from './actions/get-logs.service';
import { FirebaseService } from './firebase.service';

const actionProviders: {
  [action in keyof Actions]: Type<ActionService<unknown, unknown>>;
} = {
  getLogs: GetLogsService,
  createLog: CreateLogService,
};

@Module({
  imports: [],
  providers: [
    FirebaseService,
    ...Object.keys(actionProviders).map((key) => ({
      provide: key,
      useClass: actionProviders[key],
    })),
  ],
  exports: [],
})
export class ActionsModule {}
