import { useEffect } from 'react';

const FixScrollDemo = () => {
    useEffect(() => {
        document.body.classList.add('overflow-y-disable');
    }, []);

    useEffect(() => {
        return () => {
            document.body.classList.remove('overflow-y-disable');
        };
    }, []);
    return (
        <div className=" d-flex h-flex w-100 h-100">
            <div className="order d-flex flex-column w-100 justify-content-between">
                <div className='overflow-y-auto w-50' style={{ height: 'calc(100vh - 100px)' }}>
                    Ronaldo bất ngờ tham dự buổi phỏng vấn trước khi ĐT Bồ Đào Nha tập luyện và đã có những phút trải lòng về World Cup 2022.

                    Cristiano Ronaldo bất ngờ tham dự buổi họp báo trước buổi tập thứ ba của ĐT Bồ Đào Nha tại Al Shahaniya, Qatar. Sự xuất hiện của siêu sao người Bồ Đào Nha là khá bất ngờ nên có khá ít phóng viên tham dự buổi họp báo này. CR7 đã có những phút trải làm về lần cuối tham dự ngày hội bóng đá lớn nhất hành tinh.

                    Ronaldo bất ngờ dự họp báo: Trải lòng về World Cup & bài phỏng vấn gây sốc - 1
                    Ronaldo bất ngờ tham dự họp báo trước buổi tập của ĐT Bồ Đào Nha

                    “Thành thật mà nói, tôi rất lo lắng khi vẫn phải chứng minh bản thân khi đã 37 tuổi và 8 tháng. Sau tất cả những gì tôi đã làm và giành được trong suốt những năm qua, đây vẫn là câu chuyện đầy bất ngờ. Tất nhiên, tôi vẫn sẽ chứng minh mình là ai và đánh giá là cảm nhận của riêng mỗi người.

                    Tuy nhiên, World Cup vẫn là giải đấu quan trọng nhất phải không? Tôi chắc chắn là như vậy, đó là giấc mơ của tôi từ khi còn nhỏ. Ngay cả khi không thể giành được chức vô địch, tôi vẫn tự hào vì được góp mặt tại đây”.

                    Về câu chuyện trả lời phỏng vấn cùng Piers Morgan ngay trước thềm World Cup liệu có ảnh hưởng gì tới ĐT Bồ Đào Nha hay không, CR7 cũng không ngần ngại chia sẻ. “Đối với tôi, thời điểm chỉ có một. Tất nhiên, mọi người có thể có ý kiến này, ý kiến khác nhưng tôi lựa chọn thời điểm của mình.

                    Tôi không quan tâm đến việc người khác nghĩ gì và tôi đảm bảo chắc chắn là điều đó không ảnh hưởng tới lợi ích của ĐTQG. Mọi người từ cầu thủ cho tới ban huấn luyện biết rõ về tôi và họ hiểu tôi muốn điều gì. Nhiều người biết tôi từ khi tôi mới 11 tuổi. Họ sẽ không bị ảnh hưởng bởi những gì báo chí viết. Tôi tin chắc điều đó”.

                    Ronaldo bất ngờ dự họp báo: Trải lòng về World Cup & bài phỏng vấn gây sốc - 2

                    Ronaldo khẳng định không hề có xích mích với Bruno Fernandes

                    Câu chuyện “xích mích” giữa Ronaldo và Fernandes cũng là một đề tài nóng hổi gần đây và siêu sao người Bồ Đào Nha đã tiết lộ bí mật. “Tôi biết ai cũng thích những câu chuyện bên lề kiểu như vậy. Chuyện của tôi và Bruno đã bị xuyên tạc, một lần nữa.

                    Tôi với cậu ấy đùa nhau bởi Bruno tới trễ nên tôi hỏi là cậu ấy dùng thuyền để tới à. Đó là một câu chuyện đùa nhưng họ làm ầm lên giống như chuyện của Cancelo nữa. Cậu ấy có bất đồng với Felix và tôi là người đứng ra giảng hòa nhưng họ lại tạo ra một câu chuyện khác.

                    Tôi đã quá quen với chuyện này rồi bởi họ luôn tạo ra những câu chuyện xung quanh Ronaldo. Tuy nhiên, bạn cần biết rằng ĐT Bồ Đào Nha rất đoàn kết và đồng lòng. Tôi được mọi người bảo vệ tối đa và điều đó khiến tôi cảm thấy tuyệt vời".
                    Ronaldo bất ngờ tham dự buổi phỏng vấn trước khi ĐT Bồ Đào Nha tập luyện và đã có những phút trải lòng về World Cup 2022.

                    Cristiano Ronaldo bất ngờ tham dự buổi họp báo trước buổi tập thứ ba của ĐT Bồ Đào Nha tại Al Shahaniya, Qatar. Sự xuất hiện của siêu sao người Bồ Đào Nha là khá bất ngờ nên có khá ít phóng viên tham dự buổi họp báo này. CR7 đã có những phút trải làm về lần cuối tham dự ngày hội bóng đá lớn nhất hành tinh.

                    Ronaldo bất ngờ dự họp báo: Trải lòng về World Cup & bài phỏng vấn gây sốc - 1
                    Ronaldo bất ngờ tham dự họp báo trước buổi tập của ĐT Bồ Đào Nha

                    “Thành thật mà nói, tôi rất lo lắng khi vẫn phải chứng minh bản thân khi đã 37 tuổi và 8 tháng. Sau tất cả những gì tôi đã làm và giành được trong suốt những năm qua, đây vẫn là câu chuyện đầy bất ngờ. Tất nhiên, tôi vẫn sẽ chứng minh mình là ai và đánh giá là cảm nhận của riêng mỗi người.

                    Tuy nhiên, World Cup vẫn là giải đấu quan trọng nhất phải không? Tôi chắc chắn là như vậy, đó là giấc mơ của tôi từ khi còn nhỏ. Ngay cả khi không thể giành được chức vô địch, tôi vẫn tự hào vì được góp mặt tại đây”.

                    Về câu chuyện trả lời phỏng vấn cùng Piers Morgan ngay trước thềm World Cup liệu có ảnh hưởng gì tới ĐT Bồ Đào Nha hay không, CR7 cũng không ngần ngại chia sẻ. “Đối với tôi, thời điểm chỉ có một. Tất nhiên, mọi người có thể có ý kiến này, ý kiến khác nhưng tôi lựa chọn thời điểm của mình.

                    Tôi không quan tâm đến việc người khác nghĩ gì và tôi đảm bảo chắc chắn là điều đó không ảnh hưởng tới lợi ích của ĐTQG. Mọi người từ cầu thủ cho tới ban huấn luyện biết rõ về tôi và họ hiểu tôi muốn điều gì. Nhiều người biết tôi từ khi tôi mới 11 tuổi. Họ sẽ không bị ảnh hưởng bởi những gì báo chí viết. Tôi tin chắc điều đó”.

                    Ronaldo bất ngờ dự họp báo: Trải lòng về World Cup & bài phỏng vấn gây sốc - 2

                    Ronaldo khẳng định không hề có xích mích với Bruno Fernandes

                    Câu chuyện “xích mích” giữa Ronaldo và Fernandes cũng là một đề tài nóng hổi gần đây và siêu sao người Bồ Đào Nha đã tiết lộ bí mật. “Tôi biết ai cũng thích những câu chuyện bên lề kiểu như vậy. Chuyện của tôi và Bruno đã bị xuyên tạc, một lần nữa.

                    Tôi với cậu ấy đùa nhau bởi Bruno tới trễ nên tôi hỏi là cậu ấy dùng thuyền để tới à. Đó là một câu chuyện đùa nhưng họ làm ầm lên giống như chuyện của Cancelo nữa. Cậu ấy có bất đồng với Felix và tôi là người đứng ra giảng hòa nhưng họ lại tạo ra một câu chuyện khác.

                    Tôi đã quá quen với
                    Ronaldo bất ngờ tham dự buổi phỏng vấn trước khi ĐT Bồ Đào Nha tập luyện và đã có những phút trải lòng về World Cup 2022.

                    Cristiano Ronaldo bất ngờ tham dự buổi họp báo trước buổi tập thứ ba của ĐT Bồ Đào Nha tại Al Shahaniya, Qatar. Sự xuất hiện của siêu sao người Bồ Đào Nha là khá bất ngờ nên có khá ít phóng viên tham dự buổi họp báo này. CR7 đã có những phút trải làm về lần cuối tham dự ngày hội bóng đá lớn nhất hành tinh.

                    Ronaldo bất ngờ dự họp báo: Trải lòng về World Cup & bài phỏng vấn gây sốc - 1
                    Ronaldo bất ngờ tham dự họp báo trước buổi tập của ĐT Bồ Đào Nha

                    “Thành thật mà nói, tôi rất lo lắng khi vẫn phải chứng minh bản thân khi đã 37 tuổi và 8 tháng. Sau tất cả những gì tôi đã làm và giành được trong suốt những năm qua, đây vẫn là câu chuyện đầy bất ngờ. Tất nhiên, tôi vẫn sẽ chứng minh mình là ai và đánh giá là cảm nhận của riêng mỗi người.

                    Tuy nhiên, World Cup vẫn là giải đấu quan trọng nhất phải không? Tôi chắc chắn là như vậy, đó là giấc mơ của tôi từ khi còn nhỏ. Ngay cả khi không thể giành được chức vô địch, tôi vẫn tự hào vì được góp mặt tại đây”.

                    Về câu chuyện trả lời phỏng vấn cùng Piers Morgan ngay trước thềm World Cup liệu có ảnh hưởng gì tới ĐT Bồ Đào Nha hay không, CR7 cũng không ngần ngại chia sẻ. “Đối với tôi, thời điểm chỉ có một. Tất nhiên, mọi người có thể có ý kiến này, ý kiến khác nhưng tôi lựa chọn thời điểm của mình.

                    Tôi không quan tâm đến việc người khác nghĩ gì và tôi đảm bảo chắc chắn là điều đó không ảnh hưởng tới lợi ích của ĐTQG. Mọi người từ cầu thủ cho tới ban huấn luyện biết rõ về tôi và họ hiểu tôi muốn điều gì. Nhiều người biết tôi từ khi tôi mới 11 tuổi. Họ sẽ không bị ảnh hưởng bởi những gì báo chí viết. Tôi tin chắc điều đó”.

                    Ronaldo bất ngờ dự họp báo: Trải lòng về World Cup & bài phỏng vấn gây sốc - 2

                    Ronaldo khẳng định không hề có xích mích với Bruno Fernandes

                    Câu chuyện “xích mích” giữa Ronaldo và Fernandes cũng là một đề tài nóng hổi gần đây và siêu sao người Bồ Đào Nha đã tiết lộ bí mật. “Tôi biết ai cũng thích những câu chuyện bên lề kiểu như vậy. Chuyện của tôi và Bruno đã bị xuyên tạc, một lần nữa.

                    Tôi với cậu ấy đùa nhau bởi Bruno tới trễ nên tôi hỏi là cậu ấy dùng thuyền để tới à. Đó là một câu chuyện đùa nhưng họ làm ầm lên giống như chuyện của Cancelo nữa. Cậu ấy có bất đồng với Felix và tôi là người đứng ra giảng hòa nhưng họ lại tạo ra một câu chuyện khác.

                    Tôi đã quá quen với

                    Ronaldo bất ngờ tham dự buổi phỏng vấn trước khi ĐT Bồ Đào Nha tập luyện và đã có những phút trải lòng về World Cup 2022.

                    Cristiano Ronaldo bất ngờ tham dự buổi họp báo trước buổi tập thứ ba của ĐT Bồ Đào Nha tại Al Shahaniya, Qatar. Sự xuất hiện của siêu sao người Bồ Đào Nha là khá bất ngờ nên có khá ít phóng viên tham dự buổi họp báo này. CR7 đã có những phút trải làm về lần cuối tham dự ngày hội bóng đá lớn nhất hành tinh.

                    Ronaldo bất ngờ dự họp báo: Trải lòng về World Cup & bài phỏng vấn gây sốc - 1
                    Ronaldo bất ngờ tham dự họp báo trước buổi tập của ĐT Bồ Đào Nha

                    “Thành thật mà nói, tôi rất lo lắng khi vẫn phải chứng minh bản thân khi đã 37 tuổi và 8 tháng. Sau tất cả những gì tôi đã làm và giành được trong suốt những năm qua, đây vẫn là câu chuyện đầy bất ngờ. Tất nhiên, tôi vẫn sẽ chứng minh mình là ai và đánh giá là cảm nhận của riêng mỗi người.

                    Tuy nhiên, World Cup vẫn là giải đấu quan trọng nhất phải không? Tôi chắc chắn là như vậy, đó là giấc mơ của tôi từ khi còn nhỏ. Ngay cả khi không thể giành được chức vô địch, tôi vẫn tự hào vì được góp mặt tại đây”.

                    Về câu chuyện trả lời phỏng vấn cùng Piers Morgan ngay trước thềm World Cup liệu có ảnh hưởng gì tới ĐT Bồ Đào Nha hay không, CR7 cũng không ngần ngại chia sẻ. “Đối với tôi, thời điểm chỉ có một. Tất nhiên, mọi người có thể có ý kiến này, ý kiến khác nhưng tôi lựa chọn thời điểm của mình.

                    Tôi không quan tâm đến việc người khác nghĩ gì và tôi đảm bảo chắc chắn là điều đó không ảnh hưởng tới lợi ích của ĐTQG. Mọi người từ cầu thủ cho tới ban huấn luyện biết rõ về tôi và họ hiểu tôi muốn điều gì. Nhiều người biết tôi từ khi tôi mới 11 tuổi. Họ sẽ không bị ảnh hưởng bởi những gì báo chí viết. Tôi tin chắc điều đó”.

                    Ronaldo bất ngờ dự họp báo: Trải lòng về World Cup & bài phỏng vấn gây sốc - 2

                    Ronaldo khẳng định không hề có xích mích với Bruno Fernandes

                    Câu chuyện “xích mích” giữa Ronaldo và Fernandes cũng là một đề tài nóng hổi gần đây và siêu sao người Bồ Đào Nha đã tiết lộ bí mật. “Tôi biết ai cũng thích những câu chuyện bên lề kiểu như vậy. Chuyện của tôi và Bruno đã bị xuyên tạc, một lần nữa.

                    Tôi với cậu ấy đùa nhau bởi Bruno tới trễ nên tôi hỏi là cậu ấy dùng thuyền để tới à. Đó là một câu chuyện đùa nhưng họ làm ầm lên giống như chuyện của Cancelo nữa. Cậu ấy có bất đồng với Felix và tôi là người đứng ra giảng hòa nhưng họ lại tạo ra một câu chuyện khác.

                    Tôi đã quá quen với
                </div>
                <span>2</span>
            </div>
        </div>
    )
}
export default FixScrollDemo;
