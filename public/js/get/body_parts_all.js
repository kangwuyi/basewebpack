/*!
 * 身体部位接口 /body_parts/all
 * @url http://apiv2.chujingyi.cn/v2/body_parts/all
 */
import BS from '../common/BinarySearch';

export default {
    data: {},
    methods: function (cb) {
        let _self = this;
        axios.get('http://apiv2.chujingyi.cn/v2/body_parts/all').then((req) => {
            let BPA = req.data.data.list;
            let publicSrc = '../../noimgs/';
            const srcArr = [
                {1: publicSrc.concat('head@2x.png')},
                {8: publicSrc.concat('chest@2x.png')},
                {15: publicSrc.concat('lung@2x.png')},
                {22: publicSrc.concat('basin@2x.png')},
                {28: publicSrc.concat('overall@2x.png')},
                {34: publicSrc.concat('children@2x.png')}
            ]
            for (let i = 0; i < BPA.length; i++) {
                BPA[i]['src'] = BS(srcArr, ('' + BPA[i].id));
            }
            _self.data = BPA;
            cb(_self);
        });
    }
};

/*!
{
  "code": 0,
  "message": "success",
  "data": {
    "list": [
      {
        "id": 1,
        "parent_id": 0,
        "name": "头颈部",
        "name_en": "head",
        "children": [
          {
            "id": 2,
            "parent_id": 1,
            "name": "脑",
            "name_en": "brain"
          },
          {
            "id": 3,
            "parent_id": 1,
            "name": "眼",
            "name_en": "eye"
          },
          {
            "id": 4,
            "parent_id": 1,
            "name": "耳鼻",
            "name_en": "ear_nose"
          },
          {
            "id": 5,
            "parent_id": 1,
            "name": "口腔",
            "name_en": "mouth"
          },
          {
            "id": 6,
            "parent_id": 1,
            "name": "颈部",
            "name_en": "neck"
          },
          {
            "id": 7,
            "parent_id": 1,
            "name": "面部头皮",
            "name_en": "face"
          }
        ]
      },
      {
        "id": 8,
        "parent_id": 0,
        "name": "胸部",
        "name_en": "chest",
        "children": [
          {
            "id": 9,
            "parent_id": 8,
            "name": "乳房",
            "name_en": "female_breast"
          },
          {
            "id": 10,
            "parent_id": 8,
            "name": "肺",
            "name_en": "lung"
          },
          {
            "id": 11,
            "parent_id": 8,
            "name": "心脏",
            "name_en": "heart"
          },
          {
            "id": 12,
            "parent_id": 8,
            "name": "食道",
            "name_en": "esophagus"
          },
          {
            "id": 13,
            "parent_id": 8,
            "name": "肋骨",
            "name_en": "rib"
          },
          {
            "id": 14,
            "parent_id": 8,
            "name": "纵膈",
            "name_en": "mediastinal"
          }
        ]
      },
      {
        "id": 15,
        "parent_id": 0,
        "name": "腹部",
        "name_en": "abdomen",
        "children": [
          {
            "id": 16,
            "parent_id": 15,
            "name": "胃・食道・十二指肠",
            "name_en": "stomach"
          },
          {
            "id": 17,
            "parent_id": 15,
            "name": "大肠小肠",
            "name_en": "intestines"
          },
          {
            "id": 18,
            "parent_id": 15,
            "name": "肝胆",
            "name_en": "liver_gallbladder"
          },
          {
            "id": 19,
            "parent_id": 15,
            "name": "胰脏",
            "name_en": "pancreas"
          },
          {
            "id": 20,
            "parent_id": 15,
            "name": "肾脏",
            "name_en": "kidney"
          },
          {
            "id": 21,
            "parent_id": 15,
            "name": "脾",
            "name_en": "spleen"
          }
        ]
      },
      {
        "id": 22,
        "parent_id": 0,
        "name": "骨盆",
        "name_en": "pelvis",
        "children": [
          {
            "id": 23,
            "parent_id": 22,
            "name": "股关节",
            "name_en": "hip_joint"
          },
          {
            "id": 24,
            "parent_id": 22,
            "name": "男性器",
            "name_en": "male_genitalia"
          },
          {
            "id": 25,
            "parent_id": 22,
            "name": "泌尿器",
            "name_en": "urinary_organs"
          },
          {
            "id": 26,
            "parent_id": 22,
            "name": "肛门",
            "name_en": "hip"
          },
          {
            "id": 27,
            "parent_id": 22,
            "name": "女性器",
            "name_en": "female_genitalia"
          }
        ]
      },
      {
        "id": 28,
        "parent_id": 0,
        "name": "四肢",
        "name_en": "arm_leg",
        "children": [
          {
            "id": 29,
            "parent_id": 28,
            "name": "肩",
            "name_en": "shoulder"
          },
          {
            "id": 30,
            "parent_id": 28,
            "name": "腕",
            "name_en": "arm"
          },
          {
            "id": 31,
            "parent_id": 28,
            "name": "手",
            "name_en": "hand"
          },
          {
            "id": 32,
            "parent_id": 28,
            "name": "膝",
            "name_en": "knee"
          },
          {
            "id": 33,
            "parent_id": 28,
            "name": "脚",
            "name_en": "foot"
          }
        ]
      },
      {
        "id": 34,
        "parent_id": 0,
        "name": "全身",
        "name_en": "body",
        "children": [
          {
            "id": 35,
            "parent_id": 34,
            "name": "皮肤",
            "name_en": "skin"
          },
          {
            "id": 36,
            "parent_id": 34,
            "name": "血液",
            "name_en": "blood"
          },
          {
            "id": 37,
            "parent_id": 34,
            "name": "血管",
            "name_en": "blood_vessel"
          },
          {
            "id": 38,
            "parent_id": 34,
            "name": "神经",
            "name_en": "nerve"
          },
          {
            "id": 39,
            "parent_id": 34,
            "name": "骨",
            "name_en": "bone"
          },
          {
            "id": 40,
            "parent_id": 34,
            "name": "肌肉",
            "name_en": "muscle"
          }
        ]
      }
    ]
  }
}
 */