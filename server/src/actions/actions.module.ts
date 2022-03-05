import { Module, Type } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { Actions } from '../../../api/actions';
import { ActionService } from '../core/services/action.service';
import { CreateLogService } from './services/create-log.service';
import { GetLogsService } from './services/get-logs.service';

const actionProviders: {
  [action in keyof Actions]: Type<ActionService<unknown, unknown>>;
} = {
  getLogs: GetLogsService, // GetLogsService || FailingGetLogsService
  createLog: CreateLogService,
};

@Module({
  imports: [CoreModule],
  providers: [
    ...Object.keys(actionProviders).map((key) => ({
      provide: key,
      useClass: actionProviders[key],
    })),
  ],
  exports: [],
})
export class ActionsModule {}
