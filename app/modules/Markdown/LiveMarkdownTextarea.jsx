/* markdown 编辑器 */
import React, {Component} from 'react';
import 'highlight.js/styles/github.css';
import "../../css/markdown.css";
import hljs from 'highlight.js';
import { MarkdownPreview, MarkdownInput } from 'react-marked-markdown';

class LiveMarkdownTextarea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue ? props.defaultValue : '',
        };
    }

    handleTextChange(e) {
        this.setState({ value: e.target.value.replace(/\n\n/g, '\n').replace(/\n/g, '\n\n') });
        if (this.props.onTextChange) {
            this.props.onTextChange(e.target.value);
        }
        hljs.highlightBlock(document.getElementById('codecontainer'), null, true);
    }

    clear() {
        this.setState({ value: '' });
    }

    render() {
        const {
            placeholder,
            className,
            inputClassName,
            previewClassName,
            } = this.props;

        const { value } = this.state;

        return (
            <section className={ className }>
            <div id="codecontainer"></div>
                <MarkdownInput
                    placeholder={ placeholder }
                    onChange={ this.handleTextChange.bind(this) }
                    value={ value }
                    className={ inputClassName }
                />

                <MarkdownPreview
                    value={ value }
                    className={ previewClassName }
                />
            </section>
        )
    }
}
export default LiveMarkdownTextarea;