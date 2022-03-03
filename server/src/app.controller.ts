import { ActionRequest } from '@api/actions';
import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { ActionService } from './action.service';

@Controller()
export class AppController {
  constructor(private lazyModuleLoader: LazyModuleLoader) {}

  @Post('action')
  async action(
    @Body() actionRequest: ActionRequest,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const { ActionsModule } = await import('./actions.module');
    const actionsModuleRef = await this.lazyModuleLoader.load(
      () => ActionsModule,
    );
    const actionService = actionsModuleRef.get(
      actionRequest.action,
    ) as ActionService<unknown, unknown>;
    await firstValueFrom(actionService.preAuthorize(request));
    return response
      .status(HttpStatus.OK)
      .json(await firstValueFrom(actionService.execute(actionRequest.payload)));
  }
}
