import { Module, Type } from '@nestjs/common';
import { Actions } from '../../api/actions';
import { ActionService } from './action.service';
import { GetAllService } from './actions/get-all.service';
import { GetOneService } from './actions/get-one.service';

const actionProviders: {
  [action in keyof Actions]: Type<ActionService<unknown, unknown>>;
} = {
  getAll: GetAllService,
  getOne: GetOneService,
};

@Module({
  imports: [],
  providers: [
    ...Object.keys(actionProviders).map((key) => ({
      provide: key,
      useClass: actionProviders[key],
    })),
  ],
  exports: [],
})
export class ActionsModule {}
