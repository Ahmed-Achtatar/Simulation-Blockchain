import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockchainViewerComponent } from 'src/app/pages/blockchain-viewer/blockchain-viewer.component';
import { SettingsComponent } from 'src/app/pages/settings/settings.component';
import { CreateTransactionComponent } from 'src/app/pages/create-transaction/create-transaction.component';
import { PendingTransactionsComponent } from 'src/app/pages/pending-transactions/pending-transactions.component';
import { WalletBalanceComponent } from 'src/app/pages/wallet-balance/wallet-balance.component';
import { VerifyPdfComponent } from 'src/app/pages/verify-pdf/verify-pdf.component';

const routes: Routes = [
  {path: '', component: BlockchainViewerComponent },
  {path: 'settings', component: SettingsComponent},
  {path: 'verify', component: VerifyPdfComponent},
  {path: 'new/transaction', component: CreateTransactionComponent },
  {path: 'new/transaction/pending', component: PendingTransactionsComponent },
  {path: 'wallet/:address', component: WalletBalanceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
