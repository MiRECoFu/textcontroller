import {
  Editor,
  EditorState,
  RichUtils
} from 'draft-js';

import AMUIReact from 'amazeui-react';

var Button = AMUIReact.Button;

// var Icon = AMUIReact.Icon;

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    // 编辑器状态
    this.state = {
      editorState: EditorState.createEmpty()
    };
    // 双向绑定
    this.onChange = (editorState) => {

      this.setState({
        editorState
      })

      // console.log(this.state);
    };

    // 监听键盘事件
    this.handleKeyCommand = this.handleKeyCommand.bind(this);

  }

  _onBoldClick() {
    //RichUtils.toggleInlineStyle 将现有state  ,转换为新的state,
    // toggle 如果已经加粗了则取消加粗,如果没有则加粗
    let newState = RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD');
    this.onChange(newState);
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    return (
      <div>
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <Editor handleKeyCommand={this.handleKeyCommand} 
          editorState={this.state.editorState}
          onChange={this.onChange}/>
      </div>
    );
  }
}



export default MyEditor;