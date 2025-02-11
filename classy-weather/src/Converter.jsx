import { Component } from "react";

class FlagConverter extends Component {
    static host = "https://flagcdn.com";

    constructor(props) {
        super(props);

        this.state = {
            flagPath: [],
        };
    }

    static getDerivedStateFromProps(props) {
        const { from, to, flagWidth, flagHeight } = props;

        try {
            if (to !== "svg" && to !== "png")
                throw ConversionError(`Non supported image format: *.${to}`);

            if (to === "svg") {
                return {
                    flagPath: [`${FlagConverter.host}/${from.toLowerCase()}.${to}`],
                };
            }

            if (to === "png") {
                return {
                    flagPath: [
                        `${
                            FlagConverter.host
                        }/${flagWidth}x${flagHeight}/${from.toLowerCase()}.${to}`,
                        `${FlagConverter.host}/${flagWidth * 2}x${
                            flagHeight * 2
                        }/${from.toLowerCase()}.${to} 2x`,
                        `${FlagConverter.host}/${flagWidth * 3}x${
                            flagHeight * 3
                        }/${from.toLowerCase()}.${to} 3x`,
                    ],
                };
            }
        } catch (error) {
            console.log(`${error.name}: ${error.message}`);

            return null;
        }
    }

    render() {
        const { flagWidth, flagHeight, children } = this.props;

        return this.state.flagPath.length < 3 ? (
            <img
                src={this.state.flagPath[0]}
                width={flagWidth}
                alt={children.join("")}
            />
        ) : (
            <img
                src={this.state.flagPath[0]}
                srcSet={`${this.state.flagPath[1]},${this.state.flagPath[2]}`}
                width={flagWidth}
                height={flagHeight}
                alt={children.join("")}
            />
        );
    }
}

FlagConverter.defaultProps = {
    from: "pr",
    to: "png",
    flagWidth: "32",
    flagHeight: "24",
};

class ConversionError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConversionError";
    }
}

export { FlagConverter };