import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from 'mdb-react-ui-kit';
import Blogs from '../Blogs';
import Search from '../Search';
import Category from '../Category';
import LatestBlog from '../LatestBlog';
import Pagination from '../Pagination';

const Home = () => {
  const [data, setData] = useState([]);
  const [latestBlog, setLatestBlog] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalBlog, setTotalBlog] = useState(null);
  const [pageLimit] = useState(5)



  const options = ['Travel', 'Food', 'Fashion', 'Sports', 'Tech', 'Fitness']; // this array for show category on home page 

  useEffect(() => {
    loadBlogsData(0, 5, 0);
    fetchLatestBlog()
  }, []);

  const loadBlogsData = async (start, end, increase, operation) => {
    try {
      const totalBlog = await axios.get(`http://localhost:4000/blogs`)
      setTotalBlog(totalBlog.data.length)
      const response = await axios.get(`http://localhost:4000/blogs?_start=${start}&_end=${end}`);
      if (response.status === 200) {
        setData(response.data);
        if (operation) {
          setCurrentPage(0);
        }else{
          setCurrentPage(currentPage + increase)
        }
        
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Error loading blogs data:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete the blog?')) {
      try {
        const response = await axios.delete(`http://localhost:4000/blogs/${id}`);
        if (response.status === 200) {
          toast.success('Blog deleted successfully');
          loadBlogsData(0, 5, 0, "delete");
        } else {
          toast.error('Something went wrong');
        }
      } catch (error) {
        toast.error('Something went wrong');
        console.error('Error deleting blog:', error);
      }
    }
  };

  const excerpt = (str) => {
    if (str.length > 50) {
      str = str.substring(0, 50) + ' ... ';
    }
    return str;
  };

  const onInputChange = (e) => {
    if (!e.target.value) {
      loadBlogsData(0, 5, 0)
    }
    setSearchValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log('Search Query:', searchValue); // Log the search query
    try {
      const response = await axios.get(`http://localhost:4000/blogs`);
      if (response.status === 200) {
        const filteredData = response.data.filter((item) =>
          item.category.toLowerCase().includes(searchValue.toLowerCase())
        );
        setData(filteredData);
      } else {
        toast.error('Failed to fetch search results');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Error fetching search results:', error);
    }
  };


  const handleCategory = async (category) =>{
    const response = await axios.get(`http://localhost:4000/blogs?category=${category}`);
    if (response.status === 200) {
      setData(response.data)
    }else{
      toast.error('Something went wrong')
    }
  }


  const fetchLatestBlog = async () =>{
    const totalBlog = await axios.get(`http://localhost:4000/blogs`)
    
    const start = totalBlog.data.length - 4;
    const end = totalBlog.data.length;
    const response = await axios.get(`http://localhost:4000/blogs?_start=${start}&_end=${end}`);
    if (response.status === 200) {
      setLatestBlog(response.data)
    }else{
      toast.error('Something went wrong')
    }

  }

  return (
    <>
      <Search searchValue={searchValue} onInputChange={onInputChange} handleSearch={handleSearch} />
      <MDBRow>
        {data.length === 0 && (
          <MDBTypography className='text-center mb-0' tag='h2'>
            No Blog Found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow>
              {data && data.map((item, index) => (
                <MDBCol key={index} md='4' className='d-flex align-items-stretch'>
                  <Blogs
                    {...item}
                    excerpt={excerpt}
                    handleDelete={handleDelete}
                  />
                </MDBCol>
              ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
        <MDBCol size='3'>
                <h4 className='text-start'>Latest Post</h4>
                {latestBlog && latestBlog.map((item, index)=>(
                  <LatestBlog key={index} {...item}/>
                ))}
                <Category options={options} handleCategory={handleCategory}/>
        </MDBCol>
      </MDBRow>
      <div className="mt-3">
        <Pagination currentPage={currentPage} loadBlogData={loadBlogsData} pageLimit={pageLimit} data={data} totalBlog={totalBlog}/>
      </div>
    </>
  );
};

export default Home;
