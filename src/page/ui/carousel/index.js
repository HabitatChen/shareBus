import React from 'react'
import { Card, Carousel, Progress } from 'antd'

export default class Carousels extends React.Component {
  render() {
    return (
      <div>
        <Card title='图片背景轮播图' >
          <Carousel autoplay>
            <div>
              <h3>And Motion Banner - React</h3>
            </div>
            <div>
              <h3>文字不同</h3>
            </div>
            <div>
              <h3>vue</h3>
            </div>
            <div>
              <h3>angular</h3>
            </div>
          </Carousel>
        </Card>
        <Card title='图片背景轮播图' >
          <Carousel autoplay>
            <div>
              <img src="/carousel-img/carousel-1.jpg" alt=""/>
            </div>
            <div>
              <img src="/carousel-img/carousel-2.jpg" alt=""/>
            </div>
            <div>
              <img src="/carousel-img/carousel-3.jpg" alt=""/>
            </div>
          </Carousel>
        </Card>


        <Card title='图片背景轮播图' >
          <Carousel className='slide-container'>
            <div className='slide-wrap'>
              <div className='slide-wrap-item'>
                <div className='item-left'>
                  <img src="/carousel-img/carousel-3.jpg" style={{width: '200px', height: '200px'}}/>
                </div>
                <div className='item-right'>
                  <Carousel>
                    <div>
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                    </div>
                    <div>
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                    </div>
                    <div>
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                    </div>
                  </Carousel>
                </div>
              </div><div className='slide-wrap-item'>
                <div className='item-left'>
                  <img src="/carousel-img/carousel-3.jpg" style={{width: '200px', height: '200px'}}/>
                </div>
                <div className='item-right'>
                  <Carousel>
                    <div>
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                    </div>
                    <div>
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                    </div>
                    <div>
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                    </div>
                  </Carousel>
                </div>
              </div>
            </div><div className='slide-wrap'>
              <div>
                <div className='item-left'>
                  <img src="/carousel-img/carousel-3.jpg" style={{width: '200px', height: '200px'}}/>
                </div>
                <div className='item-right'>
                  <Carousel>
                    <div>
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                    </div>
                    <div>
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                    </div>
                    <div>
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                    </div>
                  </Carousel>
                </div>
              </div>
            </div><div className='slide-wrap'>
              <div>
                <div className='item-left'>
                  <img src="/carousel-img/carousel-3.jpg" style={{width: '200px', height: '200px'}}/>
                </div>
                <div className='item-right'>
                  <Carousel>
                    <div>
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                    </div>
                    <div>
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                    </div>
                    <div>
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                      <Progress
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={90}
                      />
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>
          </Carousel>
        </Card>
      </div>
    )
  }
}
