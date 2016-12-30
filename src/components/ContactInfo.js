import React,{Component} from 'react';

class ContactInfo extends Component{

    handleClick(){
        //Contacts의 _onSelect(key) 메소드 사용. 인자로는 Contacts의 contactKey를 사용.
        this.props.onSelect(this.props.contactKey);
    }

    //prop 혹은 state 가 변경 되었을 때,
    // 리렌더링을 할지 말지 정하는 메소드.
    shouldComponentUpdate(nextProps, nextState){
        return (JSON.stringify(nextProps) != JSON.stringify(this.props));
    }


    render(){
        //getStyle(this.props.isSelected)로 Contacts의 _isSelected 함수 사용(호출).
        //isSelect는 Contacts의 _isSelected함수의 리턴값.
        let getStyle = isSelect=>{
            if(!isSelect) return;

            //isSelect가 true면 적용.
            let style={
                fontWeight:'bold',
                background:'#4efcd8'
            };
            return style;
        };

        return (
            <li style={getStyle(this.props.isSelected)}
                onClick={this.handleClick.bind(this)}>
                {this.props.name}{this.props.phone} {this.props.conkey}</li>
        );
    }
}

export default ContactInfo;