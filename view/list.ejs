<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <!-- 引入样式 -->
    <% htmlWebpackPlugin.options.cdnConfig.forEach(function(item){ if(item.css){ %>
        <link href="<%= item.css %>" rel="stylesheet"/>
    <% }}) %>
</head>
<body>
<div id="listPage">
    <%- include common/test.ejs -%>
    <!-- header -->
    <%- include common/header.ejs -%>
    <!-- header -->
    <!-- banner -->
    <div class="box mt20"><img src="<%= require('../public/imgs/banner2.jpg').default?require('../public/imgs/banner2.jpg').default:require('../public/imgs/banner2.jpg')%>" width="100%"/></div>
    <!-- banner -->
    <div class="box h40 fs12"><span class="c-9">出境医</span> <span class="c-9">/</span> <span class="c-3">权威医院</span>
    </div>
    <div class="box list-nav">
        <div>
            <span class="sub-nav-title">国家：</span>
            <ul class="clearfix">
                <li v-bind:class="(item.allow===true)?'c-green':''" v-for="item in AllCountry.data" :key="item._id">
                    {{item.countryName}}
                </li>
            </ul>
        </div>
        <div>
            <span class="sub-nav-title">科室：</span>
            <ul class="clearfix">
                <li v-bind:class="(item.allow===true)?'c-green':''" v-for="item in AllDepartment.data" :key="item._id">
                    {{item.departmentName}}
                </li>
            </ul>
        </div>
    </div>
    <div class="box h40 fs12 c-9">注：美国日本医院排名数据引用于美国世界新闻播报及日本病院情报局，请周知</div>
    <div class="box clearfix">
        <div class="list-box pull-left">
            <!-- list -->
            <a class="list-div clearfix" v-bind:href="item.href" target="_blank" v-for="item in ArticleList.data"
               :key="item._id">
                <img v-bind:src="item.hospitalImageSrc" width="190"/>
                <div class="list-info">
                    <h3 class="clearfix">
                        <span class="t-title">{{item.hospitalName}}</span>
                        <span class="t-info">{{item.hospitalNameEn}}</span>
                        <span class="t-label" v-for="departmentRankItem in item.departmentRank"
                              :key="departmentRankItem._id">{{departmentRankItem.name}}{{departmentRankItem.rank}}</span>
                    </h3>
                    <div class="clearfix list-label">
                        <span v-bind:class="(hospitalMarkItem.level==='1')?'c-green':'c-blue'"
                              v-for="hospitalMarkItem in item.hospitalMark" :key="hospitalMarkItem._id">{{hospitalMarkItem.name}}</span>
                    </div>
                    <p><span>擅长：</span>{{item.specialty[0].name}}</p>
                    <p><span>国家：</span>{{item.country}}</p>
                    <p><span>排名：</span>{{item.rank}}</p>
                </div>
            </a>
            <!-- list -->
            <div class="clearfix">
                <el-pagination
                        class="pagination"
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[20, 40, 50, 100]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                </el-pagination>
            </div>
        </div>
        <div class="pull-right list-about">
            <div class="title-lists">
                <h2 class="clearfix">
                    <strong class="sq"></strong>
                    <span>服务项目</span>
                </h2>
                <ul class="service-list clearfix">
                    <li><a href="#" target="_blank">出国就医</a></li>
                    <li><a href="#" target="_blank">精密体验</a></li>
                    <li><a href="#" target="_blank">海外生殖</a></li>
                    <li><a href="#" target="_blank">出国就医</a></li>
                    <li><a href="#" target="_blank">海外生殖</a></li>
                    <li><a href="#" target="_blank">出国就医</a></li>
                </ul>
            </div>
            <div class="title-lists">
                <h2 class="clearfix">
                    <strong class="sq"></strong>
                    <span>前沿资讯</span>
                    <a href="#" target="_blank">More>></a>
                </h2>
                <ul>
                    <li v-for="item in Cuttingedgeinformation.data" :key="item._id">
                        <a v-bind:href="item.href" target="_blank" class="fs12"><span>></span> {{item.title}}</a>
                    </li>
                </ul>
            </div>
            <div class="title-lists">
                <h2 class="clearfix">
                    <strong class="sq"></strong>
                    <span>新药速递</span>
                    <a href="#" target="_blank">More>></a>
                </h2>
                <ul>
                    <li v-for="item in Cuttingedgeinformation.data" :key="item._id">
                        <a v-bind:href="item.href" target="_blank" class="fs12"><span>></span> {{item.title}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <div class="mt40"></div>
    <%- include common/footer.ejs -%>
    <%- include common/tip.ejs -%>
</div>
<% htmlWebpackPlugin.options.cdnConfig.forEach(function(item){ if(item.js && !htmlWebpackPlugin.options.onlyCss){ %>
    <script type="text/javascript" src="<%= item.js %>"></script>
<% }}) %>
</body>
</html>
