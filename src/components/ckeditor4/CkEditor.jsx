import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { appSetting } from 'shared/app-settings'
import loadScript from 'load-script'
var defaultScriptUrl = appSetting.ADDRESS_WEB + '/ckeditor/ckeditor.js';
//https://github.com/codeslayer1/react-ckeditor/issues/70
class CKEditor extends React.Component {
  constructor(props) {
    super(props);

    //Bindings
    this.onLoad = this.onLoad.bind(this);

    //State initialization
    this.state = {
      isScriptLoaded: props.isScriptLoaded
    };
  }

  //load ckeditor script as soon as component mounts if not already loaded
  componentDidMount() {
    if (!this.state.isScriptLoaded) {
      loadScript(this.props.scriptUrl, this.onLoad);
    } else {
      this.onLoad();
    }
  }

  // componentWillReceiveProps(props) {
  //   const editor = this.editorInstance;
  //   if (editor && editor.getData() !== props.content) {
  //     editor.setData(props.content);
  //   }
  // }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.content!==prevState.content){
      return { content: nextProps.content };
   }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.content!==this.props.content){
      const editor = this.editorInstance;
       if (editor && editor.getData() !== this.props.content) {
        editor.setData(this.props.content);
      }
    
    }
   }

  componentWillUnmount() {
    this.unmounting = true;
  }

  onLoad() {
    if (this.unmounting) return;

    this.setState({
      isScriptLoaded: true
    });

    if (!window.CKEDITOR) {
      console.error('CKEditor not found');
      return;
    }

    this.editorInstance = window.CKEDITOR.appendTo(
      ReactDOM.findDOMNode(this),
      {...defaultConfig, ...this.props.config},
      this.props.content
    );

    //Register listener for custom events if any
    for (var event in this.props.events) {
      var eventHandler = this.props.events[event];

      this.editorInstance.on(event, eventHandler);
    }
    
  }

  render() {
    return <div className={this.props.activeClass} />;
  }
}
const defaultConfig = {
  extraPlugins: 'image2',
    language:'vi',
    filebrowserImageBrowseUrl:'/admin/gallery',
    removePlugins: 'image',
}
CKEditor.defaultProps = {
  content: '',
  config: {
    ...defaultConfig
  },
  isScriptLoaded: false,
  scriptUrl: defaultScriptUrl,
  activeClass: '',
  events: {}
};

CKEditor.propTypes = {
  content: PropTypes.any,
  config: PropTypes.object,
  isScriptLoaded: PropTypes.bool,
  scriptUrl: PropTypes.string,
  activeClass: PropTypes.string,
  events: PropTypes.object
};

export default CKEditor;