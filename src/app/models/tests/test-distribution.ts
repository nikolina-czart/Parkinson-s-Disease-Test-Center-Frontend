import {TestIcon, TestName, TestNameEng, TestType} from "./test-info";


export class TestDistribution {
  uid: TestType = TestType.DEFAULT
  name: TestNameEng = TestNameEng.DEFAULT
  name_pl: TestName = TestName.DEFAULT
  icon: TestIcon = TestIcon.DEFAULT
}

export const Gyroscope: TestDistribution = {
  uid: TestType.GYROSCOPE,
  name_pl: TestName.GYROSCOPE,
  name: TestNameEng.GYROSCOPE,
  icon: TestIcon.GYROSCOPE,
}

export const FingerTapping: TestDistribution = {
  uid: TestType.FINGER_TAPPING,
  name_pl: TestName.FINGER_TAPPING,
  name: TestNameEng.FINGER_TAPPING,
  icon: TestIcon.FINGER_TAPPING,
}

export const Static: TestDistribution = {
  uid: TestType.STATIC,
  name_pl: TestName.STATIC,
  name: TestNameEng.STATIC,
  icon: TestIcon.STATIC,
}

export const ToeTapping: TestDistribution = {
  uid: TestType.ACCELEROMETER,
  name_pl: TestName.ACCELEROMETER,
  name: TestNameEng.ACCELEROMETER,
  icon: TestIcon.ACCELEROMETER,
}

export const Voice: TestDistribution = {
  uid: TestType.VOICE,
  name_pl: TestName.VOICE,
  name: TestNameEng.VOICE,
  icon: TestIcon.VOICE,
}

