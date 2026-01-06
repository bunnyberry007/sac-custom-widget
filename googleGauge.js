class GoogleGaugeWidget extends HTMLElement {

  constructor() {
    super();
    this._value = 0;
  }

  onCustomWidgetBeforeUpdate(changedProps) {
    if (changedProps.value !== undefined) {
      this._value = changedProps.value;
    }
  }

  onCustomWidgetAfterUpdate() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const value = Number(this._value) || 0;

    let status = "HIGH";
    let color = "green";

    if (value < 50) {
      status = "LOW";
      color = "red";
    } else if (value < 80) {
      status = "MEDIUM";
      color = "orange";
    }

    this.innerHTML = `
      <div style="
        width:160px;
        height:160px;
        border-radius:50%;
        border:8px solid ${color};
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        font-family:Arial;">
        <div style="font-size:32px;">${value}</div>
        <div style="font-size:16px;color:${color};">${status}</div>
      </div>
    `;
  }
}

customElements.define("google-gauge-widget", GoogleGaugeWidget);
