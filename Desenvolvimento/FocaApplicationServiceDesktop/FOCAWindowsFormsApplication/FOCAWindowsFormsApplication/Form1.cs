using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Windows.Forms;

namespace FOCAWindowsFormsApplication
{
    public partial class Form1 : Form
    {

        /*BWSE3 Serial*/
        private static readonly Thread ThreadKiLimpeza = new Thread(Core.KiLimpeza.Start);  

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {            

            ThreadKiLimpeza.Start();

        }
    }
}
