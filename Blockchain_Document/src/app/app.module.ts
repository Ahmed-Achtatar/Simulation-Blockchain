import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlockViewComponent } from './component/block-view/block-view.component';
import { BlockchainViewerComponent } from './pages/blockchain-viewer/blockchain-viewer.component';
import { HttpClientModule } from '@angular/common/http';
import { BlockchainService } from './services/blockchain.service';
import { SettingsComponent } from './pages/settings/settings.component';
import { TransactionsTableComponent } from './component/transactions-table/transactions-table.component';
import { CreateTransactionComponent } from './pages/create-transaction/create-transaction.component';
import { PendingTransactionsComponent } from './pages/pending-transactions/pending-transactions.component';
import { WalletBalanceComponent } from './pages/wallet-balance/wallet-balance.component';
import { VerifyPdfComponent } from './pages/verify-pdf/verify-pdf.component';

@NgModule({
  declarations: [
    AppComponent,
    BlockViewComponent,
    BlockchainViewerComponent,
    SettingsComponent,
    TransactionsTableComponent,
    CreateTransactionComponent,
    PendingTransactionsComponent,
    WalletBalanceComponent,
    VerifyPdfComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    BlockchainService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
