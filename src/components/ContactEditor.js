import React,{Component} from 'react';

class ContactEditor extends Component {
    constructor(props) {
        super(props);
        // Configure default state
        this.state = {
            name: "",
            phone: ""
        };
    }

    handleChange(e){
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    /*componentWillReceiveProps
     컴포넌트가 prop 을 새로 받았을 때 실행됨.
     prop에 따라(prop 값이 바뀔때마다) state 를 업데이트 해야 할 때 사용.
     이 안에서 this.setState() 를 해도 추가적으로 렌더링하지 않습니다.
    */
    componentWillReceiveProps(nextProps){
        this.setState({
            //{ this.props.contact.name }이거 안됨.
            //부모 컴포넌트인 Contacts에서
            //<ContactEditor contact={this.state.selected}부분을 아래처럼 사용.
            name: nextProps.contact.name,
            phone: nextProps.contact.phone
        });
    }

    handleClick(){

        //this.props.isSelected로 Contacts의 _isSelected 함수 사용(호출).
        if(!this.props.isSelected){
            console.log("contact not selected");

            return;
        }

        this.props.onEdit(this.state.name, this.state.phone);
    }

    render() {
        return (
            <div>
                <p>
                    <input type="text"
                           name="name"
                           placeholder="name"
                           value={this.state.name}
                           onChange={this.handleChange.bind(this)}/>

                    <input type="text"
                           name="phone"
                           placeholder="phone"
                           value={this.state.phone}
                           onChange={this.handleChange.bind(this)}/>
                    <button onClick={this.handleClick.bind(this)}>
                        Edit
                    </button>
                </p>
            </div>
        );
    }
}



export default ContactEditor;