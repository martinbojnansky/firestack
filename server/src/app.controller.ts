import { ActionRequest } from '@api/actions';
import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { ActionService } from './core/services/action.service';

@Controller()
export class AppController {
  constructor(private lazyModuleLoader: LazyModuleLoader) {}

  @Post('action')
  async action(
    @Body() body: ActionRequest,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const { ActionsModule } = await import('./actions/actions.module');
    const actionsModuleRef = await this.lazyModuleLoader.load(
      () => ActionsModule,
    );
    const actionService = actionsModuleRef.get(body.action) as ActionService<
      unknown,
      unknown
    >;
    await firstValueFrom(actionService.preAuthorize(request));
    await firstValueFrom(actionService.validate(body.payload));
    return response
      .status(HttpStatus.OK)
      .json(await firstValueFrom(actionService.execute(body.payload)));
  }
}
