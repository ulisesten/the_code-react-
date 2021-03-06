import React , {Component} from 'react';
import { courses_list } from '../../../data/urls';
import {CLineIcon, CplusplusLineIcon, JavaPlainIcon}  from 'react-devicons';

export default class CoursesList extends Component {
    constructor(props){
        super(props)

        this.state = {
            languages: [],
            loading: true,
        }

    }

    componentDidMount() {
        this.populateLanguageData();
    }

    async populateLanguageData() {
        const url = courses_list;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ languages: data, loading: false });
    }

    onClickCourse = (e)=>{
        this.props.setCourseSyllabusInfo({id: e.target.id, name: e.target.innerText});
    }

    getIcon = (lang) => {
        if(lang == 'C')
            return <CLineIcon className="list-element-icon"/>
        else if(lang == 'CPP')
            return <CplusplusLineIcon className="list-element-icon"/>
        else if(lang == 'JAVA')
            return <JavaPlainIcon className="list-element-icon"/>
    }

    render(){
        let langs = this.state.languages;

        return (
            <div>
                <h4><span className="list-header">Cursos</span></h4>
                {langs.map(
                    (lang) => (
                        <div key={lang.publicID}
                             id={lang.publicID}
                             onClick={this.onClickCourse}
                             className="list-element">
                                {this.getIcon(lang.lang)}
                                {lang.name}
                        </div>
                    )
                )}
            </div>
        )
    }
}