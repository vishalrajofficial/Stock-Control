import React, { useEffect, useState } from "react";
import { MdInventory, MdTrendingUp, MdSpeed, MdSecurity, MdCheckCircle } from "react-icons/md";
import { FaRocket, FaChartBar, FaUsers, FaGlobe, FaBoxes, FaMobile } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.scss";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className={`home ${isDarkMode ? 'dark-mode' : ''}`}>
      <motion.nav 
        className="container --flex-between"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="logo">
          <MdInventory size={32} />
          <span className="logo-text">Stock Master</span>
        </div>

        <div className="nav-right">
          <ul className="home-links">
            <ShowOnLogout>
              <motion.li 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <Link to="/register">Register</Link>
              </motion.li>
            </ShowOnLogout>
            <ShowOnLogout>
              <motion.li variants={itemVariants}>
                <motion.button 
                  className="--btn --btn-primary"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/login">Login</Link>
                </motion.button>
              </motion.li>
            </ShowOnLogout>
            <ShowOnLogin>
              <motion.li variants={itemVariants}>
                <motion.button 
                  className="--btn --btn-primary"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/dashboard">Dashboard</Link>
                </motion.button>
              </motion.li>
            </ShowOnLogin>
          </ul>
          
          {/* Dark Mode Toggle */}
          <motion.div 
            className="dark-mode-toggle"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
                         <div className="toggle-container">
               <motion.div 
                 className="toggle-switch"
                 onClick={toggleDarkMode}
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 <motion.div 
                   className="toggle-slider"
                   animate={{ x: isDarkMode ? 24 : 0 }}
                   transition={{ duration: 0.3, ease: "easeInOut" }}
                 />
               </motion.div>
             </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <motion.section 
        className="container hero"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-text" variants={itemVariants}>
          <motion.h1
            variants={itemVariants}
          >
            INVENTORY
            <br />
            <span className="highlight">MANAGEMENT</span>
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
          >
            Streamline your business operations with our comprehensive inventory management system. 
            Track products, manage stock levels, and optimize your workflow with real-time insights 
            and intelligent analytics.
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            variants={itemVariants}
          >
            <motion.button 
              className="--btn --btn-get-started"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/login">GET STARTED</Link>
            </motion.button>
            
            <motion.button 
              className="--btn --btn-learn-more"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/login">Learn More</Link>
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="stats-section"
            variants={itemVariants}
          >
            <StatCard number="15K+" label="Happy Clients" />
            <StatCard number="100K+" label="Products Managed" />
            <StatCard number="99.9%" label="Uptime" />
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-illustration"
          variants={itemVariants}
        >
          <div className="illustration-container">
            {/* Background shapes */}
            <motion.div 
              className="bg-shape shape-1"
              animate={floatAnimation}
            />
            <motion.div 
              className="bg-shape shape-2"
              animate={{...floatAnimation, transition: {...floatAnimation.transition, delay: 1}}}
            />
            <motion.div 
              className="bg-shape shape-3"
              animate={{...floatAnimation, transition: {...floatAnimation.transition, delay: 2}}}
            />
            
            {/* Main illustration elements */}
            <motion.div 
              className="phone-mockup"
              animate={floatAnimation}
            >
              <div className="phone-screen">
                <div className="checklist-item">
                  <MdCheckCircle className="check-icon completed" />
                  <div className="item-line"></div>
                </div>
                <div className="checklist-item">
                  <MdCheckCircle className="check-icon completed" />
                  <div className="item-line"></div>
                </div>
                <div className="checklist-item">
                  <div className="check-icon pending"></div>
                  <div className="item-line"></div>
                </div>
                <div className="checklist-item">
                  <div className="check-icon pending"></div>
                  <div className="item-line"></div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="person-figure"
              animate={{...floatAnimation, transition: {...floatAnimation.transition, delay: 0.5}}}
            >
              <div className="person-head"></div>
              <div className="person-body"></div>
              <div className="person-laptop"></div>
            </motion.div>
            
            <motion.div 
              className="boxes-stack"
              animate={{...floatAnimation, transition: {...floatAnimation.transition, delay: 1.5}}}
            >
              <div className="box box-1"></div>
              <div className="box box-2"></div>
              <div className="box box-3"></div>
            </motion.div>
            
            <motion.div 
              className="gear gear-1"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="gear gear-2"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            
            <motion.div 
              className="magnifying-glass"
              animate={{...floatAnimation, transition: {...floatAnimation.transition, delay: 2.5}}}
            >
              <div className="glass-lens"></div>
              <div className="glass-handle"></div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

    </div>
  );
};

const StatCard = ({ number, label }) => {
  return (
    <motion.div 
      className="stat-card"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <h3>{number}</h3>
      <p>{label}</p>
    </motion.div>
  );
};


export default Home;
