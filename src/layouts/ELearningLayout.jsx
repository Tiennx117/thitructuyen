import { useEffect, useState, useRef, useCallback } from 'react';
import { Outlet, Route, Routes, Link } from 'react-router-dom';
import { moduleService } from 'services/moduleService';
import { useBreakpoint } from 'shared/hooks/useBreakPoint';
import { useMedia } from 'shared/hooks/useMedia';
import { useOnClickOutside } from 'shared/hooks/useOnClickOutside';
import { useSelector } from 'react-redux';
import { elearningRouters } from 'routers/elearningRouters';
const ELearningLayout = () => {
  

  useEffect(() => {
    
    // moduleService.getTree().then(res=>{
    //   console.log(res);
    // })
    // userService.permission().then(res=>{
    //     dispatch(setPermission(res.data));
    // });
  }, [])
  return (
    <>

      <div className='wrapper sidebar-mini layout-fixed'>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link"><i className="fas fa-bars"></i></a>
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
              <a className="nav-link" data-toggle="dropdown" href="/admin/logout" title='logout'>
                <i className="pi pi-sign-out" />
              </a>
            </li>

          </ul>

        </nav>

        <aside className="main-sidebar sidebar-dark-primary elevation-4" >
          <a href="/" className="brand-link">
            <span className="brand-text font-weight-light">EPS E-Learning</span>
          </a>
          <div className='sidebar'>
            <nav className='mt-2'>
              <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                  {/* <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" /> */}
                </div>
                <div className="info w-100" >
                  <div className='d-flex flex-row justify-content-between '>
                    <div><Link to={{pathname:'/admin/profile'}} className="d-block">{}</Link> </div>

                  </div>

                </div>
              </div>

              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" data-accordion="false">
                <li className="nav-header">TỔNG QUAN</li>
                <li className='nav-item '>
                  <Link className="nav-link" to={'/admin/post-list'}>
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Tường hoạt động
                    </p>
                  </Link>
                </li>

                <li className="nav-header">HỌC TẬP</li>
                <li className='nav-item '>
                  <Link className="nav-link" to={'/admin/account-member-list'}>
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Tất cả khoá học
                    </p>
                  </Link>
                </li>
                <li className='nav-item '>
                  <Link className="nav-link" to={'/admin/account-member-list'}>
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Danh mục khoá học
                    </p>
                  </Link>
                </li>
                <li className='nav-item '>
                  <Link className="nav-link" to={'/admin/product-list'}>
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Thư viện video
                    </p>
                  </Link>
                </li>
                <li className='nav-item '>
                  <Link className="nav-link" to={'/admin/order-list'}>
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Các khoá học bắt buộc
                    </p>
                  </Link>
                </li>
                
                <li className="nav-item menu-open" >
                  <a href="#" className="nav-link">
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
export default ELearningLayout;