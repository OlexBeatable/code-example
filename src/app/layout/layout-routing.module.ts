import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import {AdminRoleGuard} from '../shared/guard/admin-role.guard';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'messages'
            },
            {
                path: 'messages',
                loadChildren: './messages/messages.module#MessagesModule'
            },
            {
                path: 'users',
                loadChildren: './users/users.module#UsersModule',
                canActivate: [AdminRoleGuard]
            },
            // {
            //     path: 'charts',
            //     loadChildren: './charts/charts.module#ChartsModule'
            // },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers:[AdminRoleGuard]
})
export class LayoutRoutingModule {}
