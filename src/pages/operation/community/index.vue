<template>
    <div class="operation-community"> 
      <!-- 选择社区 -->
        <div class="community">
          <img src="~/assets/images/main.png" alt="" style="margin:17.5px 20px;width:23px;">
          <div class="city" style="width:100px;margin-right:15px;display:inline-block;vertical-align:top;">
            <Select v-model="city" >
              <Option v-for="types in optionList" :value="types.value" :key="types.value" >{{ types.label }}</Option>
            </Select>
          </div>
          <div class="community" style="width:250px;display:inline-block;vertical-align:top;">
            <Select v-model="communityId" @on-change="changeCommunity">
              <Option v-for="types in communityList" :value="types.value" :key="types.value" >{{ types.label }}</Option>
            </Select>
          </div>
        </div> 
        <!-- 第一行内容区 -->
        <div class="tab-list">
          <div class="card-one item"  v-on:click="openCustomer">
            <span class="content">
              <img src="~/assets/images/custom.jpg" alt="" style="margin:15px auto;width:45px;height:30px;margin-top:20px;">
            </span>
            <span class="content title">在驻客户</span>
            <span class="content number"><span>{{pageData.settledCustomer}}</span>个</span>
          </div>
          <div class="card-two item">
            <span class="content">
              <img src="~/assets/images/member.png" alt="" style="margin:12px auto;width:36px;height:33px;margin-top:20px;">
            </span>
            <span class="content title">在驻会员</span>
            <span class="content number"><span>{{pageData.settledMember}}</span>位</span>
          </div>
          <div class="card-three">
            <div class="tabs">
              <span class="title"  v-bind:class="{active:tab=='all'}" v-on:click="changeTab('all')">全部工位数</span>
              <span class="title" v-bind:class="{active:tab=='office'}" v-on:click="changeTab('office')">{{'独立办公室('+pageData.allSpaceNum+'间)'}}</span>
              <span class="title" v-bind:class="{active:tab=='fixedDest'}"  v-on:click="changeTab('fixedDest')">{{'固定办公桌('+pageData.allFixStationsNum+'个)'}}</span>
              <span class="title" v-bind:class="{active:tab=='mobileDesk'}"  v-on:click="changeTab('mobileDesk')">{{'移动办公桌('+pageData.allMoveStationsNum+'个)'}}</span>
            </div>
            <div class="content">
              <span class="number">
                <span class="title">总数</span>
                <span class="num" v-if="tab=='all'" style="font-size:44px;color: #232428;">{{pageData.allSeatsNum}}</span>
                <span class="num" v-if="tab=='office'" style="font-size:44px;color: #232428;">{{pageData.allSpaceNum}}</span>
                <span class="num" v-if="tab=='fixedDest'" style="font-size:44px;color: #232428;">{{pageData.allFixStationsNum}}</span>
                <span class="num" v-if="tab=='mobileDesk'" style="font-size:44px;color: #232428;">{{pageData.allMoveStationsNum}}</span>
              </span>      
              <span class="number rent-special">
                <div v-if="tab=='all'" style="display:inline-block;">
                  <Tooltip placement='top'>
                      <div class="rent-title"><span class="title-text">在租</span><span class="in-rent-pic"></span></div>
                      <span class="num" style="font-size:44px;color: rgb(254, 220, 130);margin-top:-5px;display:inline-block;">{{pageData.rentSeatsNum}}</span>
                      <div slot="content">
                          <div>当前出租率（在租/总数）</div>
                          <div style="font-weight:500;font-size:20px;">{{pageData.rentRate}}</div>
                      </div>
                  </Tooltip>   
                </div>
                <span class="title" v-if="tab!='all'">在租</span> 
                <span class="num" v-if="tab=='office'" style="font-size:44px;color: rgb(254, 220, 130);display:inline-block;">{{pageData.rentSpaceNum}}</span>
                <span class="num" v-if="tab=='fixedDest'" style="font-size:44px;color: rgb(254, 220, 130);display:inline-block;">{{pageData.rentFixStationsNum}}</span>
                <span class="num" v-if="tab=='mobileDesk'" style="font-size:44px;color: rgb(254, 220, 130);display:inline-block;">{{pageData.rentMoveStationsNum}}</span>
              </span>
              <span class="number">
                <span class="title">已起租未生效</span>
                <span class="num"  v-if="tab=='all'" style="font-size:44px;color: rgb(254, 168, 119);">{{pageData.uneffectSeatsNum}}</span>
                <span class="num" v-if="tab=='office'"  style="font-size:44px;color: rgb(254, 168, 119);">{{pageData.uneffectSpaceNum}}</span>
                <span class="num" v-if="tab=='fixedDest'"  style="font-size:44px;color: rgb(254, 168, 119);">{{pageData.uneffectFixStationsNum}}</span>
                <span class="num" v-if="tab=='mobileDesk'"  style="font-size:44px;color: rgb(254, 168, 119);">{{pageData.uneffectMoveStationsNum}}</span>
              </span>
              <span class="number">
                <span class="title">未租</span>
                <span class="num" v-if="tab=='all'" style="font-size:44px;color: rgb(188, 229, 144);">{{pageData.noRentSeatsNum}}</span>
                <span class="num" v-if="tab=='office'" style="font-size:44px;color: rgb(188, 229, 144);">{{pageData.noRentSpaceNum}}</span>
                <span class="num" v-if="tab=='fixedDest'" style="font-size:44px;color: rgb(188, 229, 144);">{{pageData.noRentFixStationsNum}}</span>
                <span class="num" v-if="tab=='mobileDesk'" style="font-size:44px;color: rgb(188, 229, 144);">{{pageData.noRentMoveStationsNum}}</span>
              </span>
              <span class="number">
                <span class="title">不可用</span>
                <span class="num" v-if="tab=='all'" style="font-size:44px;color: rgb(191, 196, 207);;">{{pageData.unusefulSeatsNum}}</span>
                <span class="num" v-if="tab=='office'" style="font-size:44px;color: rgb(191, 196, 207);;">{{pageData.unusefulSpaceNum}}</span>
                <span class="num" v-if="tab=='fixedDest'" style="font-size:44px;color: rgb(191, 196, 207);;">{{pageData.unusefulFixStationsNum}}</span>
                <span class="num" v-if="tab=='mobileDesk'" style="font-size:44px;color: rgb(191, 196, 207);;">{{pageData.unusefulMoveStationsNum}}</span>
              </span>
            </div>
            
          </div>
        </div>
        <!-- 列表区 -->
        <div class="bill-list"> 
          <div class="line-one">
            <div class="box">
              <div class="header">
                  <div class="header-left" @click="openEnter">
                    <Tooltip content="包括新客户即将入驻的房间（工位）、在租客户即将增租或换租的房间（工位）" placement="top">
                      即将进场 <span class="header-left-all" style="font-size:14px;">全部 ></span>
                    </Tooltip>
                  </div>
                <div class="header-right" v-if="list.length&&(list[0].toPutawayDays<8)">
                  {{list[0].toPutawayDays==1?'今日':list[0].toPutawayDays==2?'明日':this.getWeekNum(list[0].startDate)}}:
                  <span :style="!list.length?'':'color: #FF6868;'">{{list[0].remark1}}</span><span style="font-size:14px">个</span>
                  <span style="font-size:14px">({{list[0].remark2}}工位)</span>
                </div>
              </div>
              <div class="contents" style="text-align:center" v-if="!list.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">还没有即将入驻的客户！只展示已生效的</div>
              </div>

              <div class="contents"  v-if="list.length">
                <ul >
                  <li v-for="item in list" :key="item.id">
                    <Tooltip :content="item.issueName" placement="top-start" class="table-cell">
                        <div class="ellipsis">{{item.issueName}}</div>
                    </Tooltip>
                    <span  class="table-cell">{{item.capacity}}工位</span>
                    <Tooltip :content="item.customerName" placement="top-start" class="table-cell customer" >
                      <div class="ellipsis">{{item.customerName}}</div>
                    </Tooltip>
                    <span class="table-cell" style="text-align:right">
                       {{item.payDaysName}}
                      </span>
                  </li>        
                </ul>
              </div>
            </div>
          </div>

          <div class="line-one">
            <div class="box">
              <div class="header">
                <div class="header-left" @click="openOver">
                  <Tooltip content="即将到期而且还未续约的房间（工位）" placement="top">
                    即将到期 <span class="header-left-all" style="font-size:14px;">全部 ></span>
                  </Tooltip>
                </div>   
                <div class="header-right" v-if="DueList.length&&(DueList[0].leaseRemainingDays<8)">
                  {{DueList[0].leaseRemainingDays==1?'今日':DueList[0].leaseRemainingDays==2?'明日':this.getWeekNum(DueList[0].endDate)}}:
                  <span :style="DueList[0].remark1==0?'':'color: #FF6868;'">{{DueList[0].remark1}}</span><span style="font-size:14px">个</span>
                  <span style="font-size:14px">({{DueList[0].remark2}}工位)</span>
                </div>
              </div>
              <div class="contents" style="text-align:center" v-if="!DueList.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">还没有入驻的客户哦！</div>
              </div>
              <div class="contents" v-if="DueList.length">
                <ul >
                  <li v-for="item in DueList" :key="item.id">
                     <Tooltip :content="item.issueName" placement="top-start" class="table-cell">
                        <div class="ellipsis" >{{item.issueName}}</div>
                    </Tooltip>
                    <span  class="table-cell">{{item.capacity}}工位</span>
                    <Tooltip :content="item.customerName" placement="top-start" class="table-cell customer">
                      <div class="ellipsis">{{item.customerName}}</div>
                    </Tooltip>
                    <span class="table-cell" style="text-align:right">
                      <!-- {{item.rentDays}} -->
                        <!-- {{Number(item.rentDays)==1?'今日':(Number(item.rentDays)==2?'明日':item.rentDays+'日后')}} -->
                          {{item.payDaysName}}
                        </span> 
                  </li>        
                </ul>
              </div>
            </div>
          </div>

          <div class="line-one">
           <div class="box">
              <div class="header">
                <div class="header-left" @click="openrented">
                  <Tooltip content="已经过了已出账单的服务开始日依然没有付的账单" placement="top">
                    已起租未付 <span class="header-left-all" style="font-size:14px;">全部 ></span>
                  </Tooltip>
                </div>
                <div class="header-right" v-if="unpaidList.length">
                  <span :style="unpaidList[0].remark1Str==0?'':'color: #FF6868;'">{{unpaidList[0].remark1Str}}</span><span style="font-size:14px">笔 </span>/<span> 共</span>
                  <span :style="unpaidList[0].remark2Str==0?'':'color: #FF6868;'">{{unpaidList[0].remark2Str}}</span><span style="font-size:14px">元</span>
                </div>
              </div>
              <div class="contents" style="text-align:center" v-if="!unpaidList.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">没有已过服务开始日仍未付的账单</div>
              </div>
              <div class="contents" v-if="unpaidList.length">
                <ul >
                  <li v-for="item in unpaidList" value="item.value" :key="item.value" >
                     <Tooltip :content="item.bizTypeName+item.billId" placement="top-start" class="table-cell">      
                          <div class="ellipsis"  style="color:#4A90E2;cursor:pointer;" @click="openDetail(item.billId)">{{item.bizTypeName+item.billId}}</div>
                      </Tooltip>
                      <Tooltip :content="item.customerName" placement="top-start" class="table-cell customer">
                          <div  class="ellipsis">{{item.customerName}}</div>
                      </Tooltip>
                      <span class="table-cell" style="text-align:right;flex:1.5;">{{item.debtStr}}元</span>
                      <span class="table-cell" style="text-align:right">逾{{item.overdueDays}}天</span>
                  </li>        
                </ul>
              </div>
            </div>
          </div>
          
          <div class="line-one">
             <div class="box">
              <div class="header">
                <div class="header-left" @click="openOverUnpaid('CONTRACT')">
                  <Tooltip content="已出的工位账单，过了最晚付款日但是还没到服务开始日，没有付款的" placement="top">
                    逾期未付(工位) <span class="header-left-all" style="font-size:14px;">全部 ></span>
                  </Tooltip>
                </div>
                <div class="header-right" v-if="OverdueStation.length">
                  <span :style="OverdueStation[0].remark1Str==0?'':'color: #FF6868;'">{{OverdueStation[0].remark1Str}}</span><span style="font-size:14px">笔 </span>/<span> 共</span>
                  <span :style="OverdueStation[0].remark2Str==0?'':'color: #FF6868;'">{{OverdueStation[0].remark2Str}}</span><span style="font-size:14px">元</span>
                </div>
              </div>
              <div class="contents" style="text-align:center" v-if="!OverdueStation.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">没有已过最晚付款日未付的账单（不含已过服务开始日的）</div>
              </div>
              <div class="contents" v-if="OverdueStation.length">
                <ul >
                  <li v-for="item in OverdueStation" :key="item.id">
                     <Tooltip :content="item.bizTypeName+item.billId" placement="top-start" class="table-cell">      
                         <div class="ellipsis"  style="color:#4A90E2;cursor:pointer;" @click="openDetail(item.billId)">{{item.bizTypeName+item.billId}}</div>
                      </Tooltip>
                    <Tooltip :content="item.customerName" placement="top-start" class="table-cell customer">
                         <div  class="ellipsis">{{item.customerName}}</div>
                    </Tooltip>
                    <span class="table-cell" style="text-align:right;flex:1.5;">{{item.debtStr}}元</span>
                    <span class="table-cell" style="text-align:right">逾{{item.overdueDays}}天</span>
                  </li>        
                </ul>
              </div>
            </div>
          </div>
          
          <div class="line-one">
            <div class="box">
              <div class="header">
                <div class="header-left" @click="openOverUnpaid('MEETING')">
                  <Tooltip content="已经过该期会议室账单的最晚付款日依然没有付款的" placement="top">
                    逾期未付(会议室) <span class="header-left-all" style="font-size:14px;">全部 ></span>
                  </Tooltip>
                </div>
                <div class="header-right" v-if="OverdueMeeting.length">
                  <span :style="OverdueMeeting[0].remark1Str==0?'':'color: #FF6868;'">{{OverdueMeeting[0].remark1Str}}</span><span style="font-size:14px">笔 </span>/<span> 共</span>
                  <span :style="OverdueMeeting[0].remark2Str==0?'':'color: #FF6868;'">{{OverdueMeeting[0].remark2Str}}</span><span style="font-size:14px">元</span>
                </div>
              </div>
              <div class="contents" style="text-align:center" v-if="!OverdueMeeting.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">太棒了！没有逾期的会议室账单</div>
              </div>
              <div class="contents" v-if="OverdueMeeting.length">
                <ul >
                   <li v-for="item in OverdueMeeting" :key="item.id">
                      <Tooltip :content="item.bizTypeName+item.billId" placement="top-start" class="table-cell">      
                         <div class="ellipsis"  style="color:#4A90E2;cursor:pointer;" @click="openDetail(item.billId)">{{item.bizTypeName+item.billId}}</div>
                       </Tooltip>
                      <Tooltip :content="item.customerName" placement="top-start" class="table-cell customer">
                          <div  class="ellipsis">{{item.customerName}}</div>
                      </Tooltip>
                      <span class="table-cell" style="text-align:right;flex:1.5;">{{item.debtStr}}元</span>
                      <span class="table-cell" style="text-align:right">逾{{item.overdueDays}}天</span>
                  </li>        
                </ul>
              </div>
            </div>
          </div>
          
          <div class="line-one">
            <div class="box">
              <div class="header">
                <div class="header-left" @click="openOverUnpaid('PRINT')">
                  <Tooltip content="已经过该期打印账单的最晚付款日依然没有付款的" placement="top">
                    逾期未付(打印) <span class="header-left-all" style="font-size:14px;">全部 ></span>
                  </Tooltip>
                </div>
                <div class="header-right" v-if="OverduePrint.length">
                  <span :style="OverduePrint[0].remark1Str==0?'':'color: #FF6868;'">{{OverduePrint[0].remark1Str}}</span><span style="font-size:14px">笔 </span>/<span> 共</span>
                  <span :style="OverduePrint[0].remark2Str==0?'':'color: #FF6868;'">{{OverduePrint[0].remark2Str}}</span><span style="font-size:14px">元</span>
                </div>
              </div>
              <div class="contents" style="text-align:center" v-if="!OverduePrint.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">太棒了！没有逾期的打印账单</div>
              </div>
              <div class="contents" v-if="OverduePrint.length">
                <ul >
                     <li v-for="item in OverduePrint" :key="item.id">
                      <Tooltip :content="item.bizTypeName+item.billId" placement="top-start" class="table-cell">      
                         <div class="ellipsis"  style="color:#4A90E2;cursor:pointer;" @click="openDetail(item.billId)">{{item.bizTypeName+item.billId}}</div>
                       </Tooltip>
                      <Tooltip :content="item.customerName" placement="top-start" class="table-cell customer">
                          <div  class="ellipsis">{{item.customerName}}</div>
                      </Tooltip>
                      <span class="table-cell" style="text-align:right;flex:1.5;">{{item.debtStr}}元</span>
                      <span class="table-cell" style="text-align:right">逾{{item.overdueDays}}天</span>
                  </li>        
                </ul>
              </div>
            </div>
          </div>

          <!-- @click="clappointment" -->
          <div class="line-one">
            <div class="box">
              <div class="header">
                <div class="header-left" @click="openOverNo()">
                  <Tooltip content="已经过了服务开始日但是仍未生效或作废的合同" placement="top">
                    合同逾期未操作 <span class="header-left-all" style="font-size:14px;">全部 ></span>
                  </Tooltip>
                </div>
                <div class="header-right" v-if="OverdueOperationList.length">
                  <span :style="overdueNo?'color: #FF6868;':''">{{overdueNo}}</span><span style="font-size:14px">份</span>
                </div>
              </div>
              <div class="contents" style="text-align:center" v-if="!OverdueOperationList.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">没有逾期未生效或未作废的合同</div>
              </div>
              <div class="contents" v-if="OverdueOperationList.length">
                <ul >
                   <li v-for="item in OverdueOperationList" :key="item.id">
                      <Tooltip :content="item.serialNumber" placement="top-start" class="table-cell" v-if="item.hasAuth">      
                         <div class="ellipsis"  style="color:#4A90E2;cursor:pointer;" @click="openOverNoDetail(item)">{{item.serialNumber}}</div>
                       </Tooltip>
                      <div v-if="!item.hasAuth" class="ellipsis table-cell">*****</div>
                      <Tooltip :content="item.customerName" placement="top-start" class="table-cell customer">
                          <div  class="ellipsis">{{item.customerName}}</div>
                      </Tooltip>
                      <span class="table-cell" :style="item.contractPayStatus=='PAID_OFF'?'text-align:right;':'text-align:right;color:red;'">{{item.contractPayStatusName}}</span>
                      <span class="table-cell" style="text-align:right">{{item.overDays?'逾'+item.overDays+'天':'-'}}</span>
                  </li>        
                </ul>
              </div>
            </div>
          </div>
          
          <!-- <div class="line-one">
            <div class="box">
              <div class="header">
                <div class="header-left" style="cursor:auto;">
                  <Tooltip content="潜在的客户，预约前来参观" placement="top">
                    预约参观  <span class="header-left-all" style="font-size:14px;">全部 ></span>
                  </Tooltip>
                 </div>
                 <div class="header-right" v-if="appointment.length">今日：
                  <span style="color: #FF6868;">30</span><span style="font-size:12px">人</span>
                </div>
              </div>
              <div class="contents" style="text-align:center"  v-if="!appointment.length">
                <img src="~/assets/images/waiting.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">小哥哥小姐姐正在尽全力开发，敬请期待哦亲~</div>
              </div>
                  <div class="contents" v-if="appointment.length">
                <ul >
                  <li v-for="item in appointment" :key="item.id">
                    <span class="table-cell ellipsis" style="flex:2">{{item.name}}</span>
                    <Tooltip :content="item.tel" placement="top-start" class="table-cell customer" style="flex:5">
                      <div class="ellipsis" >{{item.tel}}</div>
                    </Tooltip>
                                       
                   <Tooltip :content="item.vtime" placement="top-start" class="table-cell " style="flex:1">
                      <span class="table-cell">{{item.vtime}}</span>
                    </Tooltip>
                  </li>        
                </ul>
              </div>
            </div>
          </div> -->

          <div class="line-one">
            <!-- @click="openVisitor暂没有访客(入驻会员在APP上邀请来的)" -->
            <div class="box">
              <div class="header">
                <div class="header-left" style="cursor:auto;">
                  <Tooltip content="已入驻的会员通过APP邀请来的访客，前来探访入驻的会员" placement="top">
                    预约访客  <span class="header-left-all" style="font-size:14px;">全部 ></span>
                  </Tooltip>
                </div>
                <div class="header-right" v-if="nappointment.length&&(nappointment[0].compareTime<7)"> 
                  {{nappointment[0].compareTime==0?'今日':nappointment[0].compareTime==1?'明日':this.getWeekNum(nappointment[0].visitTime)}}:
                  <span style="color: #FF6868;">{{visitNum}}</span><span style="font-size:14px">人</span>
                </div>
              </div>
              <div class="contents" style="text-align:center" v-if="!nappointment.length">
                <img src="~/assets/images/none.png" alt="" style="width:106px;margin-top:30px">
                <div style="font-size: 14px;color: #666666;margin-top:15px;">暂没有访客(入驻会员在APP上邀请来的)</div>
                
              </div>

              <div class="contents" v-if="nappointment.length">
                <ul >
                  <li v-for="item in nappointment" :key="item.id">
                    <Tooltip :content="item.visitName" placement="top-start" class="table-cell customer" style="flex:1.5">
                      <span class="table-cell ellipsis" >{{item.visitName}}</span>
                    </Tooltip>
                    <span class="table-cell" style="flex:0.8"> →</span>
                    <Tooltip :content="item.name" placement="top-start" class="table-cell" style="flex:0.5">
                      <div class="ellipsis">{{item.name}}</div>
                    </Tooltip>
                    <Tooltip :content="item.company" placement="top-start" class="table-cell customer" style="flex2">
                      <div class="ellipsis" >{{item.company}}</div>
                    </Tooltip>
                    <Tooltip :content="item.payDaysName" placement="top-end" class="table-cell customer" style="flex:1;text-align:right;">
                       <div class="ellipsis">{{item.payDaysName}}</div>
                    </Tooltip>
                  </li>        
                </ul>
              </div>
            </div>


          </div>


          </div>
        </div>
    </div>
</template>

<script>
import './index.less';
import ToolTip from '~/components/ToolTip';
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';
export default {
  name:'List',
  head(){
    return {
      title: '运营主页'
    }
  },
  data(){
     return {
       city:'',
       communityId:'',
       tab:'all',
       optionList:[],
       communityList:[],
       list:[],
       DueList:[],
       unpaidList:[],
       OverdueOperationList:[],
       OverduePrint:[],
       OverdueStation:[],
       OverdueMeeting:[],
       appointment:[],
       nappointment:[],
       pageData:{},
       visitNum:0,
       overdueNo:''
     }
  },
  components:{
    ToolTip
  },
  watch:{ 
      city(value){
        
        let list = this.optionList.filter(item=>{
          if(item.value == value){
            return true;
          }
          return false;
        })
        this.communityList = list[0].communitys;
        this.communityId = this.communityList[0].value;
      }
  },
  mounted(){      
    this.getCommunityList();
  },
  methods:{
      //获取某日为周几
      getWeekNum(date){
          var end='';
          var today=new Date();
          var todayWeek=today.getDay()==0?7:today.getDay(); 
          var endDate = new Date(date);
          var endDateWeek=endDate.getDay()==0?7:endDate.getDay();
          var dateArray=[{label:'周日',value:7},{label:'周一',value:1},{label:'周二',value:2},{label:'周三',value:3},{label:'周四',value:4},{label:'周五',value:5},{label:'周六',value:6}]
          for(var i=0;i<dateArray.length;i++){
             if(dateArray[i].value==endDateWeek){
                  end=(endDateWeek<todayWeek)?'下'+dateArray[i].label:dateArray[i].label;
                  break;
              }
          }
          return end;
      },
      //顶部列表请求
    	getHomeList(){ 
				this.$http.get('getOperating',{cmtId:this.communityId}).then((res)=>{
          this.pageData=res.data;
				}).catch((err)=>{
					this.$Notice.error({
						title:err.message
					});
				})
      },
      
      
      //即将进场
      getComingList(data){ 
				this.$http.get('getImtPutawayList',data).then((res)=>{         
            console.log('机枪进场',res.data)
            this.list=res.data.items;
            this.list.length&&this.list.map((item,index)=>{
                var way=item.toPutawayDays;
                if(way&&way==1){
                   item.payDaysName='今日'
                }else if(way&&way==2){
                   item.payDaysName='明日'
                }else if(way&&way<8){
                   item.payDaysName=this.getWeekNum(item.startDate);
                }else if(way&&way>=8){
                   item.payDaysName=way-1+'日后'
                }else{
                   item.payDaysName='-';
                }
            })
				}).catch((err)=>{
					this.$Notice.error({
						title:err.message
					});
				})
      },
      
      //即将到期
      getDueList(data){ 
				this.$http.get('getDueList',data).then((res)=>{         
            console.log('即将到期',res.data)
             this.DueList=res.data.items;
             this.DueList.length&&this.DueList.map((item,index)=>{
                var way=item.leaseRemainingDays;
                if(way&&way==1){
                   item.payDaysName='今日'
                }else if(way&&way==2){
                   item.payDaysName='明日'
                }else if(way&&way<8){
                   item.payDaysName=this.getWeekNum(item.endDate);
                }else if(way&&way>=8){
                   item.payDaysName=way-1+'日后'
                }else{
                   item.payDaysName='-';
                }
            })
				}).catch((err)=>{
					this.$Notice.error({
						title:err.message
					});
				})
      },
      //起租未付
      getunpaidList(data){ 
				this.$http.get('unpaidList',data).then((res)=>{         
            console.log('起租未付',res.data)
             this.unpaidList=res.data.items;
				}).catch((err)=>{
					this.$Notice.error({
						title:err.message
					});
				})
      },
      //合同逾期未操作
      getOverdueOperation(data){ 
				this.$http.get('contract-no-operation',data).then((res)=>{         
             this.overdueNo=res.data.totalCount;
             this.OverdueOperationList=res.data.items;
				}).catch((err)=>{
					this.$Notice.error({
						title:err.message
					});
				})
      },
      //逾期未付
      getOverdueList(data){ 
				this.$http.get('Overduelist',data).then((res)=>{         
            console.log('逾期未付',res.data)
            if(data.bizType=='CONTRACT'){
              this.OverdueStation=res.data.items;
            }else if(data.bizType=='PRINT'){
              this.OverduePrint=res.data.items;
            }else{
              this.OverdueMeeting=res.data.items;
            }
				}).catch((err)=>{
					this.$Notice.error({
						title:err.message
					});
				})
      },
       //预约参观
      getAnappointmentListList(){ 
				this.$http.get('AnappointmentList','').then((res)=>{         
          this.appointment=res.data.items;
				}).catch((err)=>{
					this.$Notice.error({
						title:err.message
					});
				})
      },

      //会员访客
      getAnappointmentList(params){
        this.visitNum=0;
        var sameArray=[];
				this.$http.get('gitVisitorsList',params).then((res)=>{         
             this.nappointment=[].concat(res.data.items);
             if(this.nappointment.length){
                  this.visitNum=this.nappointment[0].visitorNum;
                  var first=dateUtils.dateToStr("YYYY-MM-DD",new Date(this.nappointment[0].visitTime));
                  this.nappointment.map((item,index)=>{
                    var time=dateUtils.dateToStr("YYYY-MM-DD",new Date(item.visitTime));
                    if(first==time){
                       sameArray.push(item);
                    }
                    var today=this.getToDay();
                    item.compareTime=utils.timeRange(today,time);
                    if(item.compareTime&&item.compareTime==0){
                      item.payDaysName='今日'
                    }else if(item.compareTime&&item.compareTime==1){
                      item.payDaysName='明日'
                    }else if(item.compareTime&&item.compareTime<7){
                      item.payDaysName=this.getWeekNum(item.visitTime);
                    }else if(item.compareTime&&item.compareTime>=7){
                      item.payDaysName=item.compareTime+'日后'
                    }else{
                      item.payDaysName='-';
                    }
                })
             }
             
				}).catch((err)=>{
					this.$Notice.error({
						title:err.message
					});
				})
      },
    
    getToDay() {
        var today = dateUtils.dateToStr("YYYY-MM-DD", new Date());
        return today; 
    },
    getCommunityList(){
      this.$http.get('get-community-list', '').then( r => {
          this.optionList = r.data.map(item=>{

            item.communitys = item.communitys.map(value=>{
              let i = value;
              i.value = value.id + '';
              i.label = value.name;
              return i;
            })
            let obj = item;
            obj.value = item.id + '';
            obj.label = item.name;
            return obj;
          })
          this.city = this.optionList[0].value;
          this.communityId = this.optionList[0].communitys[0].value;
      }).catch( e => {
        this.$Notice.error({
            title:e.message
        })
      })
    },

    changeCommunity(value){
        this.communityId = value;
        let data={
             ifHomePageFlag:'Y',
             communityId:this.communityId,
             page:1,
             pageSize:4
        };
        let type=['CONTRACT','PRINT','MEETING'];
        type.map((item,index)=>{
            this.getOverdueList({ifHomePageFlag:'Y',communityId:this.communityId,bizType:item,page:1,pageSize:4});
        })
        this.getHomeList();
        this.getComingList(data);
        this.getDueList(data);
        this.getunpaidList(data);
        this.getOverdueOperation(data);
        //this.getAnappointmentListList();
        var obj=Object.assign({},data,{startTime:dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date())})
        this.getAnappointmentList(obj);
    },
    changeTab(type){
      this.tab = type;
    },
    openCustomer(){
       window.open('/customer-manage/manage?pageSize=15&page=1&communityId='+this.communityId+'&cityId='+this.city+'&status=ENTERED','_blank')
    },
    openVisitor(){
      window.open('/new/#/community/visitor/list?pageSize=15&page=1&communityId='+this.communityId+'&cityId='+this.city,'_blank')
    },
    clappointment(){
      window.open('/new/#/community/communityManage/visitorsToRecord?pageSize=15&page=1&communityId='+this.communityId+'&cityId='+this.city,'_blank')
    },
    openEnter(){
      window.open('/inventory/enter-field?pageSize=15&page=1&communityId='+this.communityId+'&cityId='+this.city,'_blank')
    },
    openOver(){
      window.open('/inventory/over-date?pageSize=15&page=1&communityId='+this.communityId+'&cityId='+this.city,'_blank')
    },
    openrented(){
      window.open('/inventory/rented-unpaid?pageSize=15&page=1&communityId='+this.communityId+'&cityId='+this.city,'_blank')
    },
    openOverUnpaid(type){
      window.open('/inventory/over-date-unpaid?bizType='+type+'&pageSize=15&page=1&communityId='+this.communityId+'&cityId='+this.city,'_blank')
    },
    openDetail(id){
       window.open('/bill/list/detail/'+id,'_blank')
    },
    openOverNo(){
       window.open('/inventory/overdue-no-operation?pageSize=100&page=1&communityId='+this.communityId+'&cityId='+this.city,'_blank')
    },
    openOverNoDetail(item){
       window.open('/order-center/contract-manage/contract-list/list?serialNumber='+item.serialNumber,'_blank')
    }
  }
 }
</script>
