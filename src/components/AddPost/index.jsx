import React, { Component, Fragment } from 'react';
import Cropper from 'react-cropper';
import { withRouter } from 'react-router';
import 'cropperjs/dist/cropper.css';
import image from '@assets/images/select_image.png';

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.cropit = this.cropit.bind(this);
    this.state = {
      selectedImage: ''
    };
  }

  cropit = () => {
    const obj = {
      url: this.editor.getCroppedCanvas().toDataURL(),
      timestamp: new Date().getTime(),
      likeCount: 0,
      commentCount: 0,
      uploadedBy: 'Harsha Venkatram',
      uploaderPic: 'https://randomuser.me/api/portraits/men/1.jpg'
    };
    this.upload(obj);
  }

  upload = async (obj) => {
    const response = await fetch('http://localhost:3001/feed', {
      method: 'POST',
      body: JSON.stringify(obj), // body data type must match "Content-Type" header
      headers: {
        'Content-Type': 'application/json',
        // "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    const responseJSON = await response.json();
    await console.log('response ', responseJSON);
    await this.props.history.push('/');
  }

  setImage = (e) => {
    e.persist();
    const reader = new FileReader();
    reader.onload = (event) => {
      this.setState({
        selectedImage: event.target.result
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  render() {
    return (
      <div className="col-12 col-md-8 offset-md-4 mt-5">
        <div className="row">
          <div className="col-12">
            { this.state.selectedImage === '' && (
              <Fragment>
                <img src={image} alt="Choose File" className="img-fluid" />
                <input
                  className="btn btn-primary"
                  type="file"
                  onChange={e => this.setImage(e)}
                  accept="image/*"
                />
              </Fragment>
            )}
            { this.state.selectedImage !== '' && (
              <Fragment>
                <Cropper
                  ref={(element) => {
                    this.editor = element;
                  }}
                  src={this.state.selectedImage}
                  style={{ height: 400, width: '100%' }}
                  aspectRatio={5 / 3}
                  guides
                  cropBoxResizable={false}
                  rotatable={false}
                  dragMode="move"
                />
                <button
                  className="d-block mx-auto mt-4 btn btn-primary"
                  type="button"
                  onClick={this.cropit}
                >
                  Crop
                </button>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AddPost);
