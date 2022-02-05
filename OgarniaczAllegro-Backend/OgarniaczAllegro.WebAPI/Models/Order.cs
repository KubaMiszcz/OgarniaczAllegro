using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace OgarniaczAllegro.DAL.Models
{
    [Table("OgarniaczAllegro_Order")]
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public Status IsAllegroPay { get; set; }
        public Status HasInvoice { get; set; }
        public decimal? OrderValue { get; set; }

        public Status IsInvoiceReceived { get; set; }
        public Status IsPackageReceived { get; set; }
        public DateTime? ReceivedDate { get; set; }

        public Status IsReturnIssued { get; set; }

        public DateTime? ReturnToDate { get; set; }
        public string ReturnCode { get; set; }
        public decimal? ReturnValue { get; set; }

        public Status IsReturnSended { get; set; }
        public Status IsReturnDelivered { get; set; }
        public Status IsCashReturned { get; set; }
        public Status IsInvoiceCorrectionReceived { get; set; }

        public Status IsFinished { get; set; }
        public string Comment { get; set; }
        public string Owner { get; set; }
    }
}
