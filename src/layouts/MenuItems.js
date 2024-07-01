export const menuItems = [
    {
        id: 0,
        title: 'Tổng quan',
        url: '/overview',
        submenu: {},
    },
    {
        id: 1,
        title: 'Học tập',
        url: '/learner/my-learning',
        submenu: {
            parent: 1,
            group: [
                {
                    title: 'Bài học của tôi',
                    url: 'learner/my-learning',
                },
                {
                    title: 'Khóa học công khai',
                    url: 'learner/catalogue',
                },
                {
                    title: 'Thư viện video',
                    url: 'learner/video-library/home',
                },
                {
                    title: 'Kho tài liệu',
                    url: 'collaborate/briefcase',
                },

                {
                    title: 'Lịch sử đào tạo',
                    url: 'learner/training-history',
                },
                {
                    title: 'Lộ trình kỹ năng',
                    url: 'learner/skillpath',
                },
            ],
        }
    },
    {
        id: 2,
        title: 'Tương tác',
        url: '/collaborate/conversation',
        submenu: {
            parent: 2,
            group: [
                {
                    title: 'Cuộc trò chuyện',
                    url: 'collaborate/conversation',
                },
                {
                    title: 'Khảo sát',
                    url: 'collaborate/survey',
                },
                // {
                //     title: 'Kho tài liệu',
                //     url: 'collaborate/briefcase',
                // },
                {
                    title: 'Hội thảo trực tuyến',
                    url: 'collaborate/webinar',
                },
                {
                    title: 'Blog',
                    url: 'collaborate/blog',
                }
            ]
        }
    },
    {
        id: 3,
        title: 'Cuộc thi',
        url: '/cuocthi/banlanhdao',
        submenu: {
            parent: 3,
            group: [
                {
                    title: 'Ban lãnh đạo',
                    url: 'cuocthi/banlanhdao',
                },
                {
                    title: 'Cửa hàng',
                    url: 'cuocthi/cuahang',
                }
            ]
        }
    }
];