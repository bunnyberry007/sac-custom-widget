class RiskGaugeWidget extends HTMLElement {

  constructor() {
    super();
    this._value = 0;
  }

  /* ===== SAC LIFECYCLE ===== */
  onCustomWidgetBeforeUpdate(changedProperties) {

    // Property binding (MODEL → WIDGET)
    if (changedProperties.has("value")) {
      this._value = Number(changedProperties.get("value"));
    }

    // Method call (SCRIPT → WIDGET)
    if (changedProperties.has("setValue")) {
      this._value = Number(changedProperties.get("setValue"));
    }
  }

  onCustomWidgetAfterUpdate() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  /* ===== RENDER LOGIC ===== */
  render() {
    const value = isNaN(this._value) ? 0 : this._value;

    let risk = "LOW";
    let color = "#2e7d32"; // green

    if (value >= 70) {
      risk = "HIGH";
      color = "#c62828"; // red
    } else if (value >= 40) {
      risk = "MEDIUM";
      color = "#f9a825"; // yellow
    }

    const arcLength = value * 2.83;

    this.innerHTML = `
      <div style="width:240px;text-align:center;font-family:Arial;">
        <svg width="240" height="130" viewBox="0 0 240 130">
          <path d="M30 110 A90 90 0 0 1 210 110"
                fill="none"
                stroke="#e0e0e0"
                stroke-width="18"/>
          <path d="M30 110 A90 90 0 0 1 210 110"
                fill="none"
                stroke="${color}"
                stroke-width="18"
                stroke-dasharray="${arcLength} 999"/>
        </svg>

        <div style="margin-top:-25px">
          <div style="font-size:32px;font-weight:bold">${value}</div>
          <div style="font-size:14px;color:${color}">
            ${risk} RISK
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("risk-gauge-widget", RiskGaugeWidget);
