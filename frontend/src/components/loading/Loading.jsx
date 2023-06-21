import React, {Component, Fragment} from 'react';
import LoadingIcon from '../../assets/loader.svg';

class Loading extends Component{

    render() {
        return (
            <Fragment>
              <div className={"loading"}>
                  <img  src={LoadingIcon} alt=""/>
              </div>
            </Fragment>
        );
    }

}
export default Loading;