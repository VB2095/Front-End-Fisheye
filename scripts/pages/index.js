class Index {
  constructor() {
    this.$photographerWrapper = document.querySelector(".photographer_section");
    this.$photographerWrapperProfile =
      document.querySelector(".photograph-header");
    this.photographerApi = new PhotographerApi("/data/photographers.json");
  }

  async main() {
    const photographersData = await this.photographerApi.getPhotographers();
    let params = new URL(document.location).searchParams;
    let idphotograph = params.get("id");
    let url = window.location.href.split("?");

    if (url.length > 1) {
      photographersData.forEach((photographer) => {
        if (photographer.id == idphotograph) {
          const TemplateProfile = new PhotographerProfile(photographer);
          this.$photographerWrapperProfile.appendChild(
            TemplateProfile.createPhotographerProfile()
          );
        }
      });
    } else {
      photographersData.forEach((photographer) => {
        const Template = new PhotographerCard(photographer);
        this.$photographerWrapper.appendChild(
          Template.createPhotographerCard()
        );
      });
    }
  }
}

const index = new Index();
index.main();
