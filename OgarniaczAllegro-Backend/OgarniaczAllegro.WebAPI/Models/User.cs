using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OgarniaczAllegro.DAL.Models
{
    [Table("OgarniaczAllegro_User")]
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public string password { get; set; }
        public string FullName { get; set; }
    }
}
