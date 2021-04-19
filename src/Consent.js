import React, {Component} from 'react';
import { Button } from '@material-ui/core';

class Consent extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleSubmit(event) {
        this.props.clickAction();
        event.preventDefault();
      }

      render() {
        if (this.props.show == false){
          return null;
        }
        return (
          <div className="iden">
              <h1>טופס הסכמה</h1>
              <p>
              אני מצהיר/ה בזה כי אני מסכימ/ה להשתתף במחקר בנושא ״ניסוי בזום- פנים מוכרות" 
              </p>
              <p>
              א.	המחקר נערך בבית הספר למדעי הפסיכולוגיה באוניברסיטת תל אביב
              </p>
              <ul>
                <li>הבדיקה תמשך  4 מפגשים באורך 30 דקות כל אחד</li>
                <li>המחקר יתבצע במעבדה של פרופסור גלית יובל באופן מקוון.</li>
                <li>הנבדקים בניסוי בגילים 20-25.</li>
                <li>הניסוי לא אמור לגרום לתופעות לוואי. </li>
                <li>התועלת של ההשתתפות בניסוי היא תרומה לחקר מנגנונים לזיהוי אנשים.</li>
                <li>לא קיימים סיכונים בניסוי.</li>
              </ul>
              <p>״אני חופשי לבחור שלא להשתתף במחקר ואני חופשי להפסיק בכל עת את השתתפותי בניסוי בלי לפגוע בזכויותיי בלי שיאונה לי כל רע בלי שתינקט נגדי סנקציה כלשהי ובלי שייפגע הציון ובלי שישללו נקודות הקרדיט״</p>
              <p>״מובטחת לי סודיות באשר לזהותי האישית בפרסומים מדעיים״</p>
              <p>״מובטחת לי נכונות לענות לשאלות שיועלו על ידי ואפשרות להיוועץ בגורם נוסף באשר לקבלת החלטה להשתתף במחקר או להמשיך בו״ 
(פרופ׳ גלית יובל gality@post.tau.ac.il  03-6405474(
</p>
<p>״אני מצהיר בזה כי את הסכמתי נתתי מרצוני החופשי וכי הבנתי את כל האמור לעיל״

</p>
            <Button variant="contained" color="primary" onClick={this.handleSubmit}>אישור</Button>
          
          </div>
        );
      }
}

export default Consent;
