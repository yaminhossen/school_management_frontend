import React, { useState, useEffect } from 'react';
import { anyObject } from '../../../../../common_types/object';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../../store';
import { initialState } from '../../config/store/inital_state';
import setup from '../../config/setup';
import ImageUpload from '../../../add_new/components/ImageUpload';
export interface Props {
    // state: anyObject;
    setTotalGuardians: Function;
}

const Guardians: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );
    const [updateGuardians, setUpdateGuardians] = useState<anyObject[]>([]);

    function addNewBackground() {
        let temp = [...updateGuardians];
        temp.push({
            id: null,
            user_student_id: state.item.id,
            is_parent: '',
            relation: '',
            parent_name: '',
            parent_email: '',
            parent_phone_number: '',
            parent_image: '',
        });
        setUpdateGuardians(temp);
    }

    useEffect(() => {
        setUpdateGuardians(state.item?.parents);
        props.setTotalGuardians(state.item?.parents);
    }, [state.item]);

    function remove_from_state(index, state, setState) {
        let t = [...state];
        t.splice(index, 1);
        setState(t);
        props.setTotalGuardians(t);
    }

    function setData(index: number, name: string, value: string) {
        let t = JSON.parse(JSON.stringify(updateGuardians));
        t[index][name] = value;
        console.log({ t, index, name, value, data: t[index] });
        setUpdateGuardians(t);
        props.setTotalGuardians(t);
    }
    console.log('Guardians state', state.item?.parents?.parent_details);

    return (
        <>
            <div className="full_width">
                <div className="form_section_heading">
                    <h4>Guardians</h4>
                </div>
                <div className="multi_inputs">
                    {/* <div className="pb-4 px-0">
                        <span
                            className="btn btn-sm  btn-outline-info"
                            onClick={addNewBackground}
                        >
                            Add new
                        </span>
                    </div> */}
                            <div className="multi_input_group">
                                <div className="d-flex">
                                    <div className="form-group form-vertical">
                                        <label>Relation</label>
                                        <div className="form_elements">
                                            <select
                                                name={`relation${1}`}
                                                id=""
                                                defaultValue={state.item.parents?.relation}
                                                onChange={(e) =>
                                                    setData(
                                                        1,
                                                        'relation',
                                                        `${e.target.value}`,
                                                    )
                                                }
                                            >
                                                <option value="father">
                                                    father
                                                </option>
                                                <option value="mother">
                                                    mother
                                                </option>
                                                <option value="husband">
                                                    husband
                                                </option>
                                                <option value="brother">
                                                    brother
                                                </option>
                                                <option value="sister">
                                                    sister
                                                </option>
                                                <option value="uncle">
                                                    uncle
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label>Name</label>
                                        <div className="form_elements">
                                            <input
                                                type="text"
                                                placeholder="parents name"
                                                name={`parent_name${1}`}
                                                defaultValue={
                                                    state.item?.parents?.parent_details?.name
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        1,
                                                        'name',
                                                        `${e.target.value}`,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label>Email</label>
                                        <div className="form_elements">
                                            <input
                                                type="text"
                                                placeholder="parent email"
                                                name={`parent_email${1}`}
                                                defaultValue={
                                                    state.item?.parents?.parent_details?.email
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        1,
                                                        'email',
                                                        `${e.target.value}`,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label>Phone number</label>
                                        <div className="form_elements">
                                            <input
                                                type="text"
                                                placeholder="parent phone number"
                                                name={`parent_phone_number${1}`}
                                                defaultValue={
                                                    state.item?.parents?.parent_details?.phone_number
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        1,
                                                        'phone_number',
                                                        `${e.target.value}`,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label>Image</label>
                                        <div className="form_elements">
                                            <ImageUpload name ={`parent_image${1}`} defaultImage={state.item?.parents?.parent_details?.image} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                </div>
            </div>
        </>
    );
};

export default Guardians;
