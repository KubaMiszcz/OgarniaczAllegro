using System;

namespace OgarniaczAllegro.WebAPI.DTO
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } //zamowienie
        public string IsAllegroPay { get; set; } // allegro Pay	
        public string HasInvoice { get; set; } //na firme?
        public decimal? OrderValue { get; set; } // suma kupionych

        public string IsInvoiceReceived { get; set; } // faktura OK ?
        public string IsPackageReceived { get; set; } // Przesyłka odebrana
        public MyDateDTO ReceivedDate { get; set; } // Data odebrania -> 

        public string IsReturnIssued { get; set; } //Zwrot zgłoszony

        public MyDateDTO ReturnToDate { get; set; } // odeslij do
        public string ReturnCode { get; set; } // kod zwrotu
        public decimal? ReturnValue { get; set; } // kwota do zwrotu

        public string IsReturnSended { get; set; } // Zwrot wysłany
        public string IsReturnDelivered { get; set; } // Zwrot u sprzedającego
        public string IsCashReturned { get; set; } // zwrot na koncie
        public string IsInvoiceCorrectionReceived { get; set; } // korekta OK ?

        public string IsFinished { get; set; } // ALL OK
        public string Note { get; set; } // notatka
    }
}
