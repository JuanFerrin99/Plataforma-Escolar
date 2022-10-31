import React from "react";

export class Hero extends React.Component {
  render() {
    return (
      <section class="section">
        <div class="container is-fluid">
          <div class="columns">
            <div class="column is-10 is-offset-2">
              <img src="https://ise.com.ar/wp-content/uploads/2021/08/cropped-GettyImages-1226985345-scaled-1.jpg" />
            </div>
            <div class="column is-5 title-container">
              <h1 class="title is-3">El Instituto</h1>
              <h2 class="subtitle is-3 has-text-grey-light">
                Formando Profesionales desde 1962
              </h2>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Hero;