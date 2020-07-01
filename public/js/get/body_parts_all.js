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