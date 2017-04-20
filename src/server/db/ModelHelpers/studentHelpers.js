import StudentModel from '../QueryModels/StudentModel';
import { upload } from '../../cloudinary/cloudHelpers';
import { storeInGallery, recognize, galleryRemoveUser } from '../../kairosFR/kairosHelpers';
import { sendMailForArrival } from '../../mailgun/mailgunHelpers';
import moment from 'moment';

const Student = new StudentModel();

exports.addToClass = async (req, res) => {
  try {
    var added = false;
    const classNames = req.body.selectedClass.split(',');
    for (let i = 0; i < classNames.length; i++) {
      req.body.selectedClass = classNames[i];
      let { studentPhoto, studentUserName, selectedClass } = req.body;
      let [ enrolled ] = await Student.checkIfStudentIsEnrolled(studentUserName, selectedClass);
      if (enrolled.length === 0) {
        const { url } = await upload(req.body);
        await Student.updateUser(url, studentUserName);
        await Student.addToClass(studentUserName, selectedClass);
        await storeInGallery(studentUserName, selectedClass, url);
        added = true;
      }
    }
    if (added) {
      res.sendStatus(201);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.removeFromClass = async (req, res) => {
  try {
    const classNames = req.body.className.split(',');
    for (let i = 0; i < classNames.length; i++) {
      req.body.className = classNames[i];
      await Student.removeFromClass(req.body);
      await galleryRemoveUser(req.body);
    }
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.checkInStudents = async (req, res) => {
  try {
    const { url } = await upload(req.body);
    const matches = await recognize(url);
    const date = await moment().format('YYYY-MM-DD hh:mm:ss');
    const [matchedUsers] = await Student.getMatchedUsers(matches);
    await Student.checkInOnTime(matchedUsers, date);
    sendMailForArrival(matchedUsers);    
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getByClass = async (req, res) => {
  try {
    const className = req.query.class;
    const students = await Student.getStudentsByClass(className);
    res.status(200).send(students[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

