import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { VirtualScroller } from 'primereact/virtualscroller';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { socialNetworkService } from 'services/socialNetworkService';
import { Dropdown } from 'primereact/dropdown';
import PropTypes from 'prop-types';
import { InputTextarea } from 'primereact/inputtextarea';
import './style/custom-tabview.scss';
const ShareSocialNetwork = (props) => {
  const [visibleShare, setvisibleShare] = useState(false)
  const UserId = useSelector(state => state.oauth.UserId) || '';
  const [listDepartment, setListDepartment] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [listUser, setListUser] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [UseName, setUseName] = useState('')
  const [Department, setDepartment] = useState('')
  const [sharedContent, setSharedContent] = useState('')
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [IdUnit, setIdUnit] = useState('')
  useEffect(() => {
    if (props.visibleShare == true) {
      setvisibleShare(props.visibleShare)
      loadApi()
    }
  }, [props.visibleShare]);
  const loadApi = async () => {
    let param = {
      UserID: UserId,
      Poster: Department
    }
    let param1 = {
      User_Id: UserId,
      UseName: UseName
    }
    let result = await socialNetworkService.getListDepartment(param)
    let result1 = await socialNetworkService.getListUser(param1)
    let data = result.data
    setIdUnit(data[0]?.IdUnit)
    setListDepartment(data)
    setListUser(result1.data)
  }
  const onCategoryChange = (e) => {
    let _selectedCategories = [...selectedCategories];

    if (e.checked)
      _selectedCategories.push(e.value);
    else
      _selectedCategories = _selectedCategories.filter(item => item !== e.value);

    setSelectedCategories(_selectedCategories);
  };
  const onDepartmentChange = (e) => {
    let _selectedDepartments = [...selectedDepartments];

    if (e.checked)
      _selectedDepartments.push(e.value);
    else
      _selectedDepartments = _selectedDepartments.filter(item => item !== e.value);
    console.log('_selectedDepartments', _selectedDepartments)
    setSelectedDepartments(_selectedDepartments);
  };
  const onChangeSelected = (e) => {
    setSelectedDepartment(e.value)
  };
  const onKeyDownSearchUser = async (e) => {
    if (e.key == 'Enter') {
      let param1 = {
        User_Id: UserId,
        UseName: UseName
      }
      let result1 = await socialNetworkService.getListUser(param1)
      setListUser(result1.data)
    }
  }
  const onKeyDownSearchDepartment = async (e) => {
    if (e.key == 'Enter') {
      let param = {
        UserID: UserId,
        Poster: Department
      }
      let result = await socialNetworkService.getListDepartment(param)
      setListDepartment(result.data)
    }
  }
  const clearAll = () => {
    setUseName('')
    setSharedContent('')
    setSelectedDepartment('')
    setSelectedCategories([])
    setSelectedDepartments([])
    setDepartment('')
  }
  const shared = async () => {
    let strDepartments = selectedDepartments.join(',')
    let strUserShare = selectedCategories.join(',')
    if (strDepartments == '' && strUserShare == '') {
      alert('Bạn phải chọn ít nhất 1 phòng ban hoặc 1 cán bộ cụ thể')
    }
    else {
      let param = {
        IdDepartment: strDepartments,
        UserShareId: strUserShare,
        IdContent: props.IdContent,
        User_Id: UserId,
        ShareContentTxt: sharedContent,
        IdUnit: IdUnit
      }
      let result = await socialNetworkService.shareContent(param)
      setUseName('')
      setSharedContent('')
      setSelectedDepartment('')
      setSelectedCategories([])
      setSelectedDepartments([])
      setDepartment('')
      setvisibleShare(false)
      props.onChange()
    }

  }
  const footerContent = (
    <div>
      <Button label="Chia sẻ" onClick={() => shared()} autoFocus />
      <Button label="Xóa tất cả" onClick={() => clearAll()} className="p-button-text" />
    </div>
  );
  const itemTemplate = (item, options) => {
    return (
      <div key={item.User_Id} className="flex align-items-center" style={{ height: '2rem' }}>
        <Checkbox inputId={item.User_Id} name="category" value={item.User_Id} onChange={onCategoryChange} checked={selectedCategories.some((item1) => item1 === item.User_Id)} />
        <label htmlFor={item.User_Id} className="ml-2">{item.UseName + ' (' + item.UserFullName + ')'}</label>
      </div>
    );
  };
  const itemTemplateDepartment = (item, options) => {
    return (
      <div key={item.code} className="flex align-items-center" style={{ height: '2rem' }}>
        <Checkbox inputId={item.code} name="department" value={item.code} onChange={onDepartmentChange} checked={selectedDepartments.some((item1) => item1 === item.code)} />
        <label htmlFor={item.code} className="ml-2">{item.name}</label>
      </div>
    );
  };
  return (
    <>
      <Dialog header="Chia sẻ với nhóm của tôi" visible={visibleShare} style={{ width: '70vw' }}
        onHide={() => {
          setvisibleShare(false);
          props.onChange()
          setUseName('')
          setSharedContent('')
          setSelectedDepartment('')
          setSelectedCategories([])
          setSelectedDepartments([])
          setDepartment('')
        }} footer={footerContent} draggable={false} resizable={false}>
        {/* <div className='row'>
          <div className='col-6'>
            <span style={{ fontWeight: 700 }}>Phòng ban</span>
            <InputText style={{ marginLeft: '0.5rem', width: '340px' }} value={Department} onKeyDown={(e) => onKeyDownSearchDepartment(e)} onChange={(e) => setDepartment(e.target.value)} />
          </div>
          <div className='col-6'>
            <span style={{ fontWeight: 700 }}>Cán bộ cụ thể</span>
            <InputText style={{ marginLeft: '0.5rem', width: '340px' }} value={UseName} onKeyDown={(e) => onKeyDownSearchUser(e)} onChange={(e) => setUseName(e.target.value)} />
          </div>
        </div> */}
        <></>
        <div className='row'>
          <div className='col-6'><span style={{ fontWeight: 700 }}>Phòng ban</span></div>
          <div className='col-6'><span style={{ fontWeight: 700 }}>Cán bộ cụ thể</span></div>
        </div>
        <div className='row'>
          <div className='col-6'>
            <span className="font-bold block mb-2"><InputText className='input-text' value={Department} onKeyDown={(e) => onKeyDownSearchDepartment(e)} onChange={(e) => setDepartment(e.target.value)} /></span>
            <VirtualScroller
              items={listDepartment}
              itemSize={50}
              itemTemplate={itemTemplateDepartment}
              className="virtual-scroller border-1 surface-border border-round"
            // style={{ width: "500px", height: "200px" }}
            />
          </div>
          <div className='col-6'>
            <span className="font-bold block mb-2"><InputText className='input-text' value={UseName} onKeyDown={(e) => onKeyDownSearchUser(e)} onChange={(e) => setUseName(e.target.value)} /></span>
            <VirtualScroller
              items={listUser}
              itemSize={50}
              itemTemplate={itemTemplate}
              className="virtual-scroller border-1 surface-border border-round"
            // style={{ width: "500px", height: "200px" }}
            />
          </div>
        </div>
        {/* <div className='row'>
          <div className='col-6'>
            <div className=" flex justify-content-center" style={{ height: '30vh', marginLeft: '5rem', marginTop: '1rem' }}>
              <div className="card flex justify-content-center">
                <VirtualScroller
                  items={listDepartment}
                  itemSize={50}
                  itemTemplate={itemTemplateDepartment}
                  className="border-1 surface-border border-round"
                  style={{ width: "500px", height: "200px" }}
                />
              </div>
            </div>
          </div>
          <div className='col-6'>
            <div className=" flex justify-content-center" style={{ height: '30vh', marginLeft: '7.5rem', marginTop: '1rem' }}>
              <div className="card flex justify-content-center">
                <VirtualScroller
                  items={listUser}
                  itemSize={50}
                  itemTemplate={itemTemplate}
                  className="border-1 surface-border border-round"
                  style={{ width: "350px", height: "200px" }}
                />
              </div>
            </div>
          </div>
        </div> */}
        <div className='row' style={{ marginTop: '1rem' }}>
          <div className='col-12'><span style={{ fontWeight: 700 }}>Nội dung chia sẻ</span></div></div>
        <div className='row' >
          <div className='col-12'><InputTextarea className='input-content' rows={4} value={sharedContent} onChange={(e) => setSharedContent(e.target.value)} /></div>
        </div>
      </Dialog>
    </>
  )
}
ShareSocialNetwork.propTypes = {
  onChange: PropTypes.func
};
ShareSocialNetwork.defaultProps = {
  onChange: () => { }
}
export default ShareSocialNetwork;