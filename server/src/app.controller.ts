import { ActionRequest } from '@api/actions';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { ActionService } from './action.service';

@Controller()
export class AppController {
  constructor(private lazyModuleLoader: LazyModuleLoader) {}

  @Post('action')
  async action(
    @Body() actionRequest: ActionRequest,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const { ActionsModule } = await import('./actions.module');
      const actionsModuleRef = await this.lazyModuleLoader.load(
        () => ActionsModule,
      );
      const actionService = actionsModuleRef.get(
        actionRequest.action,
      ) as ActionService<unknown, unknown>;
      return response
        .status(HttpStatus.OK)
        .json(await firstValueFrom(actionService.run(actionRequest.payload)));
    } catch (e) {
      console.log('\x1b[31m', '[ERROR]', e);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(e);
    }
  }
}
