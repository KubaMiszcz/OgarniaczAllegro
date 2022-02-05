namespace OgarniaczAllegro.WebAPI.DTO
{
    public class OrderDTO
    {
        string Order { get; set; } //zamowienie
        string IsAllegroPay { get; set; } // allegro Pay	
        string HasInvoice { get; set; } //na firme?
        string OrderTotalAmount { get; set; } // suma kupionych

        string IsInvoiceReceived { get; set; } // faktura OK ?
        string IsPackageReceived { get; set; } // Przesyłka odebrana
        string ReceivedDate { get; set; } // Data odebrania -> 

        string IsReturnIssued { get; set; } //Zwrot zgłoszony

        string ReturnToDate { get; set; } // odeslij do
        string ReturnCode { get; set; } // kod zwrotu
        string ReturnTotalAmount { get; set; } // kwota do zwrotu

        string IsReturnSended { get; set; } // Zwrot wysłany
        string IsReturnDelivered { get; set; } // Zwrot u sprzedającego
        string IsCashReturned { get; set; } // zwrot na koncie
        string IsInvoiceCorrectionReceived { get; set; } // korekta OK ?

        string IsFinished { get; set; } // ALL OK
        string Note { get; set; } // notatka
    }
}
