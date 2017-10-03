import {Component, cloneElement} from "react";

export class RefraxModel {
    constructor(ext) {
        let schema = ext.schema();

        this.$root = Object.assign({}, schema);
        this.$root = this.buildSchema(this.$root, schema);
        this.changeListeners = [];
    }

    buildSchema(root, schema) {
        const _this = this;
        let clone = {};
        for (const prop in schema) {
            if (schema.hasOwnProperty(prop)) {
                if (schema[prop] instanceof Object) {
                    let subRoot = Object.assign({}, schema[prop]);
                    subRoot = this.buildSchema(subRoot, schema[prop]);
                    Object.defineProperty(clone, prop, {
                        get() {
                            return subRoot;
                        },
                        set(value) {
                            clone[prop] = value;
                            _this.notifyPropertyUpdated(clone, prop);
                        },
                        enumerable: true
                    });
                } else {
                    Object.defineProperty(clone, prop, {
                        get() {
                            return root[prop];
                        },
                        set(value) {
                            root[prop] = value;
                            _this.notifyPropertyUpdated(root, prop);
                        },
                        enumerable: true
                    });
                }
            }
        }
        return clone;
    }

    notifyPropertyUpdated(object, property) {
        for (const listener of this.changeListeners) {
            listener(object, property);
        }
    }

    subscribePropertyUpdated(listener) {
        this.changeListeners.push(listener);
    }


    normalize(target, root) {
        for (const prop in root) {
            if (root.hasOwnProperty(prop)) {
                if (root[prop] instanceof Object) {
                    target[prop] = this.normalize({}, root[prop]);
                } else {
                    target[prop] = root[prop];
                }
            }
        }
        return target;
    }
}

export class RefraxComponent extends Component {
    constructor(props) {
        super(props);
        this.props.model.subscribePropertyUpdated((obj, prop) => {
            this.forceUpdate();
        });
    }


    render() {
        return cloneElement(this.props.children, {model: this.props.model.$root});
    }
}