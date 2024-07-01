import { useEffect, useState, useRef, useCallback } from 'react';
import { adminRouters } from 'routers/adminRouters';
import { Outlet, Route, Routes, Link } from 'react-router-dom';
import { moduleService } from 'services/moduleService';
import { useBreakpoint } from 'shared/hooks/useBreakPoint';
import { useMedia } from 'shared/hooks/useMedia';
import { useOnClickOutside } from 'shared/hooks/useOnClickOutside';
import { useSelector } from 'react-redux';
import { removeToken, setTokenLMS } from 'store/oauth/oauthSlice';
import { useDispatch } from 'react-redux';
import { oauthService } from 'services/oauthService';
const AdminLayout = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.oauth.currentUser);
  const systemMenu = useRef();
  const [toggle, setToggle] = useState(false);
  const [toggleLeftMenu, setToggleLeftMenu] = useState(false);
  const breakpoint = useBreakpoint();
  const breakpoint2 = useMedia();
  const refLeftMenu = useRef();
  const warehouseRef = useRef();
  const facebookRef = useRef();
  useOnClickOutside(refLeftMenu, () => {

    if (breakpoint2.isXs || breakpoint2.isSm) {
      document.body.classList.remove('sidebar-open');
      document.body.classList.remove('sidebar-collapse');
      setToggle(false);
    }
    if (breakpoint2.isMd) {
      document.body.classList.add('sidebar-collapse');
      setToggle(false);
    }

  });


  const toggleMenu = () => {
    if (!toggle) {

      document.body.classList.add('sidebar-open');
      if (breakpoint2.isLg) {
        document.body.classList.add('sidebar-collapse');
      }
      if (breakpoint2.isMd) {
        document.body.classList.remove('sidebar-collapse');
      }

    } else {

      document.body.classList.remove('sidebar-open');
      document.body.classList.remove('sidebar-collapse');
    }
    setToggle(!toggle);
  }
  const onClickMenu = (ref)=>{
    if(!toggleLeftMenu){
      ref.current.classList.add('menu-is-opening')
      ref.current.classList.add('menu-open');
    }else {
      ref.current.classList.remove('menu-is-opening')
      ref.current.classList.remove('menu-open')
    } 
    setToggleLeftMenu(!toggleLeftMenu);
  }
  const checkDevice = async ()=>{
    let aspSessionId = sessionStorage.getItem('aspSessionId');
    if(aspSessionId){
      let result = await oauthService.checkDevice(aspSessionId);
      console.log(result.data);
      if(result.data){
        window.href.location(result.data)
      }
    }
    
  }

  useEffect(() => {
    
    // moduleService.getTree().then(res=>{
    //   console.log(res);
    // })
    // userService.permission().then(res=>{
    //     dispatch(setPermission(res.data));
    // });
    checkDevice();
  }, []);

  return (
    <>

      <div className='wrapper sidebar-mini'>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" onClick={() => toggleMenu()}><i className="fas fa-bars"></i></a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a className="nav-link" >Home</a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="#" className="nav-link">Contact</a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">

            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="/login" title='logout' onClick={()=>{dispatch(removeToken());}}>
                <i className="pi pi-sign-out" />
              </a>
            </li>

          </ul>

        </nav>

        <aside className="main-sidebar sidebar-dark-primary elevation-4" ref={refLeftMenu}>
          <a href="/" className="brand-link">
            <span className="brand-text font-weight-light">OG beta</span>
          </a>
          <div className='sidebar'>
            <nav className='mt-2'>
              <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                  {/* <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" /> */}
                </div>
                <div className="info w-100" >
                  <div className='d-flex flex-row justify-content-between '>
                    <div><Link to={{pathname:'/admin/profile'}} className="d-block">{currentUser?.full_name}</Link> </div>

                  </div>

                </div>
              </div>

              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" data-accordion="false">
                <li className='nav-item '>
                  <Link className="nav-link" to={'/admin/post-list'}>
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Bài viết
                    </p>
                  </Link>
                </li>
                <li className='nav-item '>
                  <Link className="nav-link" to={'/admin/account-member-list'}>
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Thành viên
                    </p>
                  </Link>
                </li>
                <li className='nav-item '>
                  <Link className="nav-link" to={'/admin/order-list'}>
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Đơn hàng
                    </p>
                  </Link>
                </li>
                <li className='nav-item '>
                  <Link className="nav-link" to={'/admin/gallery-module'}>
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Thư viện ảnh
                    </p>
                  </Link>
                </li>
                <li className='nav-item '>
                  <Link className="nav-link" to={'/admin/slide-list'}>
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Slide
                    </p>
                  </Link>
                </li>
                <li className='nav-item '>
                  <Link className="nav-link" to={'/admin/store-list'}>
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Cửa hàng
                    </p>
                  </Link>
                </li>
                <li className='nav-item '>
                  <Link className="nav-link" to={'/admin/category-list'}>
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Danh mục
                    </p>
                  </Link>
                </li>
                <li className='nav-item '>
                  <Link className="nav-link" to={'/admin/province-list'}>
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Tỉnh/thành phố
                    </p>
                  </Link>
                </li>

                <li className='nav-item '>
                  <Link className="nav-link" to={'/admin/district-list'}>
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Quận/huyện
                    </p>
                  </Link>
                </li>

                <li ref={warehouseRef} className="nav-item" >
                  <a href="#" className="nav-link" onClick={()=>onClickMenu(warehouseRef)}>
                    <i className="nav-icon fa-brands fa-facebook" />
                    <p>
                      Quản lý kho
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link className="nav-link" to={'/admin/calculation-unit-list'}>
                        <i className="far fa-circle nav-icon" />
                        <p>Danh mục đơn vị tính</p>
                      </Link>
                    </li>

                  </ul>
                </li>


                <li ref={systemMenu} className="nav-item" >
                  <a href="#" className="nav-link" onClick={()=>onClickMenu(systemMenu)}>
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      System
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link className="nav-link" to={'/admin/user-list'}>
                        <i className="far fa-circle nav-icon" />
                        <p>Users</p>
                      </Link>

                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/admin/role-list'}>
                        <i className="far fa-circle nav-icon" />
                        <p>Roles</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/admin/module-list'}>
                        <i className="far fa-circle nav-icon" />
                        <p>Module</p>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>

            </nav>
          </div>

        </aside>
        <div className='content-wrapper'>
          <div className='p-3'>
            <Routes>

              {adminRouters.map(({ path, component: Component }, index) =>
                //console.log(route)
                <Route path={path} key={index} element={<Component />} />
              )}

            </Routes>
            <Outlet />
          </div>

        </div>
        {/* <footer className="main-footer">
          <strong>Copyright © 2014-2021 <a href="/">OG</a>.</strong>
          All rights reserved.
          <div className="float-right d-none d-sm-inline-block">
            <b>Version</b> 3.2.0
          </div>
        </footer> */}
      </div>


    </>
  )
}
export default AdminLayout;