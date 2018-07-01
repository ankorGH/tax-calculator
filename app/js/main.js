const app = new Vue({
  el: "#app",
  data: {
    monthlyPay: 0,
    monthlyAllowance: 0,
    isYearly: false,
    labelIncomeMonthly: "Monthly Income",
    lableAllowanceMonthly: "Monthly Allowance",
    labelIncomeYearly: "Yearly Income",
    labelAllowanceYearly: "Yearly Allowance"
  },
  methods: {
    calculateMonthlyTax: function() {
      const taxes = [
        { limit: 261, tax: 0 },
        { limit: 70, tax: 0.05 },
        { limit: 100, tax: 0.1 },
        { limit: 2810, tax: 0.175 }
      ];

      let amount =
        this.checkAmtValidity(this.monthlyAllowance) +
        this.checkAmtValidity(this.monthlyPay);

      let tax;

      if (amount > 3241) {
        tax = amount * 0.25;
        return tax;
      }

      tax = taxes.reduce((acc, val) => {
        return acc + calculateEachTax(val.limit, val.tax);
      }, 0);

      function calculateEachTax(limit, tax) {
        if (amount > limit) {
          amount -= limit;
          return tax * limit;
        }
        let amtTaxed = amount * tax;
        amount = 0;
        return amtTaxed;
      }

      return tax;
    },
    calculateMonthlySSNIT: function() {
      let amount =
        this.checkAmtValidity(this.monthlyAllowance) +
        this.checkAmtValidity(this.monthlyPay);
      return amount * 0.055;
    },
    checkAmtValidity: function(amt) {
      amt = parseInt(amt);
      if (!!amt) {
        if (this.isYearly) {
          amt = amt / 12;
        }
        return amt;
      }
      return 0;
    }
  },
  computed: {
    calculateTax: function() {
      return this.calculateMonthlyTax().toFixed(2);
    },
    calculateSSNIT: function() {
      return this.calculateMonthlySSNIT().toFixed(2);
    },
    calculateTakeHomeSalary: function() {
      let amt =
        this.checkAmtValidity(this.monthlyAllowance) +
        this.checkAmtValidity(this.monthlyPay);
      let taxes = this.calculateMonthlyTax() + this.calculateMonthlySSNIT();
      return (amt - taxes).toFixed(2);
    }
  }
});
