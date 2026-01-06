class RiskGaugeWidget extends HTMLElement {

  constructor() {
    super();
    this._value = 0;
  }

  onCustomWidgetBeforeUpdate(changedProps) {
    if (changedProps.value !== undefined) {
      this._value = Number(changedProps.value);
    }
  }

  onCustomWidgetAfterUpdate() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const value = Math.max(0, Math.min(100, this._value));

    let risk = "LOW";
    let color = "#2e7d32"; // green

    if (value >= 70) {
      risk = "HIGH";
      color = "#c62828"; // red
    } else if (value >= 40) {
      risk = "MEDIUM";
      color = "#f9a825"; // yellow
    }

    this.innerHTML = `
      <div style="width:220px;text-align:center;font-family:Arial;">
        
        <svg width="220" height="120" viewBox="0 0 220 120">
          
          <!-- background arc -->
          <path d="M20 100 A90 90 0 0 1 200 100"
                fill="none"
                stroke="#e0e0e0"
                stroke-width="18"/>

          <!-- value arc -->
          <path d="M20 100 A90 90 0 0 1 200 100"
                fill="none"
                stroke="${color}"
                stroke-width="18"
                stroke-dasharray="${value * 2.83} 999"/>

        </svg>

        <div style="margin-top:-20px;">
          <div style="font-size:32px;font-weight:bold;">${value}</div>
          <div style="font-size:14px;color:${color};">
            ${risk} RISK
          </div>
        </div>

      </div>
    `;
  }
}

customElements.define("risk-gauge-widget", RiskGaugeWidget);
