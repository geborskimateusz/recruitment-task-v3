class Model {

    constructor() {
        if (Model._instance) {
            return Model._instance
        }
        Model._instance = this;

        this.schema = this.constructor.name.toLowerCase()

        this.findAll = () => {
            return this.schema;
        }
    }
}

module.exports = Model;