export const CATEGORIES = [
  {
    id: 'programming',
    title: 'Programming & CS',
    description: 'Master core programming concepts, data structures, algorithms, and modern languages like Python, JavaScript & C++.',
    icon: 'Code2',
    color: 'from-violet-500 to-indigo-600',
    accentColor: '#8b5cf6',
    badge: 'Popular',
    topics: ['Data Structures', 'Algorithms', 'OOP Concepts', 'JavaScript & Python', 'Time Complexity'],
    totalQuestions: 20
  },
  {
    id: 'dbms',
    title: 'Database Management',
    description: 'Explore relational databases, SQL queries, normalization, indexing, transactions, and ACID principles.',
    icon: 'Database',
    color: 'from-blue-500 to-cyan-600',
    accentColor: '#3b82f6',
    badge: 'Core Tech',
    topics: ['SQL Queries', 'ACID Properties', 'Normalization (1NF-BCNF)', 'Indexing & B-Trees', 'Transactions & Concurrency'],
    totalQuestions: 18
  },
  {
    id: 'networks',
    title: 'Computer Networks',
    description: 'Understand the architecture of the internet, OSI model, TCP/IP stack, routing protocols, and cybersecurity fundamentals.',
    icon: 'Network',
    color: 'from-emerald-500 to-teal-600',
    accentColor: '#10b981',
    badge: 'Essential',
    topics: ['OSI 7-Layer Model', 'TCP/IP vs UDP', 'Routing Protocols', 'Subnetting & CIDR', 'Network Security & DNS'],
    totalQuestions: 18
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    description: 'Delve into machine learning algorithms, deep learning neural networks, NLP, and modern generative AI models.',
    icon: 'BrainCircuit',
    color: 'from-fuchsia-500 to-pink-600',
    accentColor: '#d946ef',
    badge: 'Trending',
    topics: ['Supervised & Unsupervised', 'Neural Networks & Backprop', 'Overfitting & Regularization', 'Transformers & NLP', 'Loss Functions'],
    totalQuestions: 18
  },
  {
    id: 'gk',
    title: 'General Knowledge & Tech',
    description: 'Test your knowledge of technology history, famous pioneers, modern innovations, and scientific breakthroughs.',
    icon: 'Globe2',
    color: 'from-amber-500 to-orange-600',
    accentColor: '#f59e0b',
    badge: 'Trivia',
    topics: ['Computing Pioneers', 'Tech Milestones', 'Space & Physics', 'Internet History', 'World Tech Giants'],
    totalQuestions: 18
  }
];

export const ALL_QUESTIONS = [
  // ==========================================
  // PROGRAMMING & COMPUTER SCIENCE (20 Questions)
  // ==========================================
  {
    id: 'prog-1',
    category: 'programming',
    difficulty: 'easy',
    question: 'What is the time complexity of searching an element in a balanced Binary Search Tree (BST)?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 1,
    explanation: 'In a balanced Binary Search Tree with n nodes, the height is approximately log2(n). Each comparison cuts the search space in half, resulting in O(log n) time complexity.',
    codeSnippet: null
  },
  {
    id: 'prog-2',
    category: 'programming',
    difficulty: 'medium',
    question: 'What is the output of the following JavaScript code snippet?',
    codeSnippet: `console.log(typeof NaN);\nconsole.log(NaN === NaN);`,
    options: [
      'number, true',
      'number, false',
      'undefined, false',
      'NaN, true'
    ],
    correctAnswer: 1,
    explanation: 'In JavaScript, typeof NaN evaluates to "number". Furthermore, according to IEEE 754 floating-point standards, NaN is never equal to any value, including itself, so NaN === NaN is false.',
    hint: 'Think about IEEE 754 floating point specifications and JavaScript type coercion.'
  },
  {
    id: 'prog-3',
    category: 'programming',
    difficulty: 'easy',
    question: 'Which data structure follows the Last-In-First-Out (LIFO) order?',
    options: ['Queue', 'Stack', 'Linked List', 'Priority Queue'],
    correctAnswer: 1,
    explanation: 'A Stack strictly follows the LIFO principle, where elements are added and removed from the same end (top), like a stack of plates.',
    codeSnippet: null
  },
  {
    id: 'prog-4',
    category: 'programming',
    difficulty: 'medium',
    question: 'In Object-Oriented Programming, which principle is violated if a subclass cannot be substituted for its base class without breaking the application?',
    options: [
      'Single Responsibility Principle',
      'Open-Closed Principle',
      'Liskov Substitution Principle',
      'Interface Segregation Principle'
    ],
    correctAnswer: 2,
    explanation: 'The Liskov Substitution Principle (L in SOLID) states that objects of a superclass should be replaceable with objects of its subclasses without altering the correctness of the program.',
    codeSnippet: null
  },
  {
    id: 'prog-5',
    category: 'programming',
    difficulty: 'hard',
    question: 'What is the amortized time complexity of inserting an element into a dynamic array (like std::vector or Python list)?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 0,
    explanation: 'Although resizing the array occasionally requires allocating new memory and copying n elements (costing O(n)), doubling the capacity ensures that n insertions cost O(2n), which averages out to O(1) amortized time per insertion.',
    codeSnippet: null
  },
  {
    id: 'prog-6',
    category: 'programming',
    difficulty: 'medium',
    question: 'Consider the Python snippet below. What does it return?',
    codeSnippet: `def func(x, lst=[]):\n    lst.append(x)\n    return lst\n\nfunc(1)\nprint(func(2))`,
    options: ['[2]', '[1, 2]', '[1], [2]', 'TypeError'],
    correctAnswer: 1,
    explanation: 'In Python, default arguments are evaluated only once when the function is defined, not every time the function is called. Hence, mutable default arguments like lists persist state across invocations.'
  },
  {
    id: 'prog-7',
    category: 'programming',
    difficulty: 'easy',
    question: 'Which sorting algorithm has the best worst-case time complexity among the following?',
    options: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Insertion Sort'],
    correctAnswer: 2,
    explanation: 'Merge Sort guarantees O(n log n) time complexity in all cases (worst, average, best) by recursively dividing the array and merging sorted halves. Quick Sort has a worst-case of O(n²).',
    codeSnippet: null
  },
  {
    id: 'prog-8',
    category: 'programming',
    difficulty: 'hard',
    question: 'In C++, what is the primary role of a "virtual destructor"?',
    options: [
      'To prevent memory allocation errors during object creation',
      'To ensure that derived class destructors are called when an object is deleted via a base class pointer',
      'To allow destructors to take runtime arguments',
      'To force the compiler to inline the destructor code'
    ],
    correctAnswer: 1,
    explanation: 'When deleting a derived class object through a base class pointer, if the base class destructor is not virtual, only the base class destructor will execute, leading to undefined behavior and resource leaks.',
    codeSnippet: null
  },
  {
    id: 'prog-9',
    category: 'programming',
    difficulty: 'medium',
    question: 'Which graph traversal algorithm uses a Queue data structure to explore vertices level-by-level?',
    options: [
      'Depth First Search (DFS)',
      'Breadth First Search (BFS)',
      'Kruskal\'s Algorithm',
      'Tarjan\'s Algorithm'
    ],
    correctAnswer: 1,
    explanation: 'Breadth First Search (BFS) explores all neighboring nodes at the present depth before moving on to nodes at the next depth level, using a FIFO queue.',
    codeSnippet: null
  },
  {
    id: 'prog-10',
    category: 'programming',
    difficulty: 'hard',
    question: 'What design pattern provides a unified interface to a set of interfaces in a subsystem, making it easier to use?',
    options: ['Adapter', 'Facade', 'Decorator', 'Proxy'],
    correctAnswer: 1,
    explanation: 'The Facade design pattern provides a higher-level, simplified interface that shields the client from the complex internal architecture and dependencies of a subsystem.',
    codeSnippet: null
  },
  {
    id: 'prog-11',
    category: 'programming',
    difficulty: 'easy',
    question: 'In JavaScript, which method is used to convert a JSON string into a JavaScript object?',
    options: ['JSON.stringify()', 'JSON.parse()', 'JSON.toObject()', 'JSON.convert()'],
    correctAnswer: 1,
    explanation: 'JSON.parse() parses a JSON string, constructing the JavaScript value or object described by the string.',
    codeSnippet: null
  },
  {
    id: 'prog-12',
    category: 'programming',
    difficulty: 'medium',
    question: 'What is the space complexity of standard recursive QuickSort in the average case?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 1,
    explanation: 'The call stack for recursive QuickSort requires space proportional to the depth of the recursion tree, which is O(log n) on average for a balanced partition.',
    codeSnippet: null
  },
  {
    id: 'prog-13',
    category: 'programming',
    difficulty: 'hard',
    question: 'Which of the following problems is known to be NP-Complete?',
    options: [
      'Single Source Shortest Path (Dijkstra)',
      'Minimum Spanning Tree (Prim)',
      'Boolean Satisfiability Problem (3-SAT)',
      'Maximum Flow (Ford-Fulkerson)'
    ],
    correctAnswer: 2,
    explanation: 'The 3-SAT (3-Conjunctive Normal Form Boolean Satisfiability) problem was proven to be NP-complete by the Cook-Levin theorem.',
    codeSnippet: null
  },
  {
    id: 'prog-14',
    category: 'programming',
    difficulty: 'easy',
    question: 'What keyword in Java prevents a method from being overridden by a subclass?',
    options: ['static', 'final', 'abstract', 'const'],
    correctAnswer: 1,
    explanation: 'The "final" keyword applied to a method prevents subclasses from overriding its implementation.',
    codeSnippet: null
  },
  {
    id: 'prog-15',
    category: 'programming',
    difficulty: 'medium',
    question: 'What is the primary difference between a process and a thread?',
    options: [
      'Threads have their own independent memory space, processes share memory',
      'Processes have independent address spaces, while threads within the same process share memory and resources',
      'Threads cannot run concurrently on multi-core processors',
      'Processes are managed by hardware, threads by the compiler'
    ],
    correctAnswer: 1,
    explanation: 'A process is an executing instance of a program with isolated memory address space, whereas threads are lightweight execution units within a process that share the process\'s heap, code, and data segments.',
    codeSnippet: null
  },

  // ==========================================
  // DATABASE MANAGEMENT SYSTEMS (DBMS) (18 Questions)
  // ==========================================
  {
    id: 'dbms-1',
    category: 'dbms',
    difficulty: 'easy',
    question: 'Which of the following is NOT one of the ACID properties of database transactions?',
    options: ['Atomicity', 'Consistency', 'Integrity', 'Durability'],
    correctAnswer: 2,
    explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability. "Integrity" is an overarching relational goal, but not one of the four letters of ACID.',
    codeSnippet: null
  },
  {
    id: 'dbms-2',
    category: 'dbms',
    difficulty: 'medium',
    question: 'What normal form addresses and eliminates transitive dependencies among non-prime attributes?',
    options: [
      'First Normal Form (1NF)',
      'Second Normal Form (2NF)',
      'Third Normal Form (3NF)',
      'Boyce-Codd Normal Form (BCNF)'
    ],
    correctAnswer: 2,
    explanation: 'A relation is in 3NF if it is in 2NF and no non-prime attribute is transitively dependent on the primary key (X -> Y where Y is non-prime implies X must be a super key).',
    codeSnippet: null
  },
  {
    id: 'dbms-3',
    category: 'dbms',
    difficulty: 'medium',
    question: 'What will be the result of a LEFT OUTER JOIN between table A (left) and table B (right)?',
    options: [
      'Only the rows that match in both tables',
      'All rows from table B, and only matching rows from table A',
      'All rows from table A, plus matching rows from table B (with NULLs for non-matching B rows)',
      'Cartesian product of all rows from A and B'
    ],
    correctAnswer: 2,
    explanation: 'A LEFT OUTER JOIN returns all records from the left table (A), along with the matching records from the right table (B). Where no match exists, NULL values are populated for B\'s columns.',
    codeSnippet: null
  },
  {
    id: 'dbms-4',
    category: 'dbms',
    difficulty: 'hard',
    question: 'What is the primary difference between a B-Tree and a B+ Tree index in relational databases?',
    options: [
      'B-Trees are binary trees, while B+ Trees can have multi-way branching',
      'In a B+ Tree, data pointers and values reside exclusively in the leaf nodes, which are linked together for fast sequential scans',
      'B-Trees can only index numerical keys, whereas B+ Trees can index text',
      'B+ Trees require O(n) time for search operations'
    ],
    correctAnswer: 1,
    explanation: 'In a B+ Tree, internal nodes only store routing keys, and all data records/pointers are stored at leaf nodes. The leaf nodes are connected in a linked list, enabling rapid range queries and sequential disk access.',
    codeSnippet: null
  },
  {
    id: 'dbms-5',
    category: 'dbms',
    difficulty: 'easy',
    question: 'Which SQL clause is used to filter records resulting from an aggregate function like SUM() or COUNT()?',
    options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
    correctAnswer: 1,
    explanation: 'The HAVING clause filters rows after aggregation has occurred (post-GROUP BY), whereas WHERE filters individual rows before grouping.',
    codeSnippet: null
  },
  {
    id: 'dbms-6',
    category: 'dbms',
    difficulty: 'medium',
    question: 'What is a "Dirty Read" anomaly in concurrent database transactions?',
    options: [
      'A transaction reads data that has been modified by another transaction that has not yet committed',
      'A transaction re-reads a row and finds differing data because another transaction committed an update',
      'A query executes and returns rows that were deleted by a completed transaction',
      'A deadlock caused by two transactions waiting on identical table locks'
    ],
    correctAnswer: 0,
    explanation: 'A Dirty Read happens when Transaction A reads modifications made by Transaction B before Transaction B commits. If Transaction B rolls back, Transaction A operated on invalid data.',
    codeSnippet: null
  },
  {
    id: 'dbms-7',
    category: 'dbms',
    difficulty: 'hard',
    question: 'What is the highest ANSI SQL transaction isolation level, preventing all dirty reads, non-repeatable reads, and phantom reads?',
    options: [
      'Read Uncommitted',
      'Read Committed',
      'Repeatable Read',
      'Serializable'
    ],
    correctAnswer: 3,
    explanation: 'Serializable is the highest isolation level. It guarantees that the execution of concurrent transactions produces the same outcome as if they were executed sequentially one after another.',
    codeSnippet: null
  },
  {
    id: 'dbms-8',
    category: 'dbms',
    difficulty: 'easy',
    question: 'What type of key uniquely identifies each record in a relational database table?',
    options: ['Foreign Key', 'Primary Key', 'Candidate Key', 'Composite Key'],
    correctAnswer: 1,
    explanation: 'A Primary Key uniquely identifies each row in a database table and cannot contain NULL values.',
    codeSnippet: null
  },
  {
    id: 'dbms-9',
    category: 'dbms',
    difficulty: 'medium',
    question: 'In the Two-Phase Locking (2PL) protocol, what occurs during the "Shrinking Phase"?',
    options: [
      'The transaction acquires new locks and cannot release existing locks',
      'The transaction releases locks and cannot acquire any new locks',
      'The database compresses log files to save disk space',
      'The transaction rolls back its changes'
    ],
    correctAnswer: 1,
    explanation: 'In 2PL, the growing phase is when locks may only be acquired. Once the first lock is released, the shrinking phase begins, during which locks may only be released and no new locks can be acquired.',
    codeSnippet: null
  },
  {
    id: 'dbms-10',
    category: 'dbms',
    difficulty: 'hard',
    question: 'What does the Write-Ahead Logging (WAL) protocol mandate to ensure durability (D in ACID)?',
    options: [
      'Table data must be flushed to disk before log entries are generated',
      'Log records corresponding to database modifications must be written to stable storage before the data pages are written to disk',
      'All user queries must be stored in plain text files before parsing',
      'Backups must be written to tape drives ahead of each transaction'
    ],
    correctAnswer: 1,
    explanation: 'Write-Ahead Logging dictates that log records describing a change must be securely committed to persistent storage before the actual dirty buffer pages are flushed to the database disk files.',
    codeSnippet: null
  },
  {
    id: 'dbms-11',
    category: 'dbms',
    difficulty: 'medium',
    question: 'Which SQL command is classified as a Data Definition Language (DDL) command?',
    options: ['SELECT', 'INSERT', 'ALTER', 'UPDATE'],
    correctAnswer: 2,
    explanation: 'ALTER modifies the structural definition of database objects (tables, schemas), making it DDL. SELECT and INSERT are DML (Data Manipulation Language).',
    codeSnippet: null
  },
  {
    id: 'dbms-12',
    category: 'dbms',
    difficulty: 'easy',
    question: 'What does a Clustered Index do to the physical storage of data in a database table?',
    options: [
      'It creates an auxiliary lookup table without altering data order',
      'It physically orders and stores the rows of the table according to the indexed key columns',
      'It encrypts the table rows using symmetric keys',
      'It stores data into distributed cloud buckets'
    ],
    correctAnswer: 1,
    explanation: 'A clustered index determines the physical order of data in a table. Since physical data can only be sorted in one way, there can be only one clustered index per table.',
    codeSnippet: null
  },

  // ==========================================
  // COMPUTER NETWORKS (18 Questions)
  // ==========================================
  {
    id: 'net-1',
    category: 'networks',
    difficulty: 'easy',
    question: 'At which layer of the OSI model does the Internet Protocol (IP) operate?',
    options: [
      'Data Link Layer (Layer 2)',
      'Network Layer (Layer 3)',
      'Transport Layer (Layer 4)',
      'Session Layer (Layer 5)'
    ],
    correctAnswer: 1,
    explanation: 'The Internet Protocol (IPv4 and IPv6) operates at the Network Layer (Layer 3) of the OSI model, handling logical addressing and packet routing across networks.',
    codeSnippet: null
  },
  {
    id: 'net-2',
    category: 'networks',
    difficulty: 'medium',
    question: 'What is the default port number used by secure HTTPS traffic?',
    options: ['80', '443', '8080', '22'],
    correctAnswer: 1,
    explanation: 'HTTPS (HTTP over TLS/SSL) communicates over TCP port 443 by default. Unencrypted HTTP uses port 80.',
    codeSnippet: null
  },
  {
    id: 'net-3',
    category: 'networks',
    difficulty: 'medium',
    question: 'What are the three flags sent in sequence during the standard TCP Three-Way Handshake?',
    options: [
      'ACK -> SYN -> SYN-ACK',
      'SYN -> SYN-ACK -> ACK',
      'SYN -> ACK-FIN -> ACK',
      'RST -> SYN -> ACK'
    ],
    correctAnswer: 1,
    explanation: 'The TCP handshake begins with the client sending a SYN packet, the server responding with a SYN-ACK packet, and the client confirming with an ACK packet.',
    codeSnippet: null
  },
  {
    id: 'net-4',
    category: 'networks',
    difficulty: 'easy',
    question: 'Which protocol is responsible for resolving an IP address to a physical MAC address on a local area network?',
    options: ['DNS', 'DHCP', 'ARP', 'ICMP'],
    correctAnswer: 2,
    explanation: 'ARP (Address Resolution Protocol) maps dynamic Layer 3 IP addresses to physical Layer 2 MAC addresses on local broadcast domains.',
    codeSnippet: null
  },
  {
    id: 'net-5',
    category: 'networks',
    difficulty: 'hard',
    question: 'In IPv4 subnetting with CIDR prefix /26, how many usable host IP addresses are available in each subnet?',
    options: ['64', '62', '32', '30'],
    correctAnswer: 1,
    explanation: 'A /26 subnet leaves 32 - 26 = 6 bits for hosts. 2^6 = 64 total addresses. Subtracting 2 (one for network address and one for broadcast address) leaves 62 usable host addresses.',
    codeSnippet: null
  },
  {
    id: 'net-6',
    category: 'networks',
    difficulty: 'medium',
    question: 'Why does UDP have lower latency compared to TCP?',
    options: [
      'UDP encrypts all packet payloads automatically',
      'UDP is connectionless and does not perform handshakes, acknowledgments, or flow/congestion control',
      'UDP only transmits over fiber optic cables',
      'UDP operates at the Application Layer'
    ],
    correctAnswer: 1,
    explanation: 'UDP avoids connection setup overhead, packet retransmissions, acknowledgments, and congestion window throttling, making it ideal for real-time gaming and audio/video streaming.',
    codeSnippet: null
  },
  {
    id: 'net-7',
    category: 'networks',
    difficulty: 'hard',
    question: 'Which routing protocol is an exterior gateway protocol (EGP) used to exchange routing information between autonomous systems (AS) on the global internet?',
    options: ['OSPF', 'BGP', 'RIP', 'EIGRP'],
    correctAnswer: 1,
    explanation: 'BGP (Border Gateway Protocol) is the standardized exterior gateway protocol designed to route packets between different autonomous systems across the Internet.',
    codeSnippet: null
  },
  {
    id: 'net-8',
    category: 'networks',
    difficulty: 'easy',
    question: 'What is the primary function of DNS (Domain Name System)?',
    options: [
      'To assign IP addresses to newly joined WiFi devices',
      'To translate human-friendly domain names (e.g. google.com) into numerical IP addresses',
      'To filter out malicious viruses and spam emails',
      'To accelerate download speeds via peer-to-peer torrenting'
    ],
    correctAnswer: 1,
    explanation: 'DNS functions as the phonebook of the Internet, mapping alphabetical domain names to the machine-readable IP addresses required for routing.',
    codeSnippet: null
  },
  {
    id: 'net-9',
    category: 'networks',
    difficulty: 'medium',
    question: 'Which protocol is used by the ping utility to verify host reachability and round-trip time?',
    options: ['IGMP', 'ICMP', 'SNMP', 'SMTP'],
    correctAnswer: 1,
    explanation: 'Ping uses ICMP (Internet Control Message Protocol) Echo Request and Echo Reply messages to measure latency and verify connectivity.',
    codeSnippet: null
  },
  {
    id: 'net-10',
    category: 'networks',
    difficulty: 'hard',
    question: 'In the context of network security, what does a SYN Flood attack exploit?',
    options: [
      'DNS cache poisoning vulnerabilities in local resolvers',
      'The TCP three-way handshake by leaving half-open connections that exhaust server resources',
      'Buffer overflows in the ARP table cache',
      'Weak pre-shared keys in WPA2 Wi-Fi handshakes'
    ],
    correctAnswer: 1,
    explanation: 'A SYN flood sends a flood of TCP SYN packets with spoofed IP addresses without completing the handshake with an ACK. The server keeps half-open sockets in its backlog queue until it exhausts memory and denies new connections.',
    codeSnippet: null
  },
  {
    id: 'net-11',
    category: 'networks',
    difficulty: 'easy',
    question: 'What is the length of an IPv6 address in bits?',
    options: ['32 bits', '64 bits', '128 bits', '256 bits'],
    correctAnswer: 2,
    explanation: 'An IPv6 address is 128 bits (16 octets) long, represented as eight groups of four hexadecimal digits separated by colons.',
    codeSnippet: null
  },
  {
    id: 'net-12',
    category: 'networks',
    difficulty: 'medium',
    question: 'What is the maximum data payload size (MTU) of a standard Ethernet frame before fragmentation occurs?',
    options: ['576 bytes', '1500 bytes', '9000 bytes', '65535 bytes'],
    correctAnswer: 1,
    explanation: 'Standard Ethernet has a Maximum Transmission Unit (MTU) of 1500 bytes for the IP packet payload (excluding the Ethernet header and trailer).',
    codeSnippet: null
  },

  // ==========================================
  // ARTIFICIAL INTELLIGENCE & MACHINE LEARNING (18 Questions)
  // ==========================================
  {
    id: 'ai-1',
    category: 'ai',
    difficulty: 'easy',
    question: 'Which branch of Machine Learning trains algorithms on labeled input-output pairs?',
    options: [
      'Supervised Learning',
      'Unsupervised Learning',
      'Reinforcement Learning',
      'Self-Supervised Contrastive Learning'
    ],
    correctAnswer: 0,
    explanation: 'Supervised Learning uses dataset examples that include both input features and the corresponding target ground-truth labels.',
    codeSnippet: null
  },
  {
    id: 'ai-2',
    category: 'ai',
    difficulty: 'medium',
    question: 'What is the primary purpose of an activation function like ReLU in an artificial neural network?',
    options: [
      'To normalize data inputs to a zero mean and unit variance',
      'To introduce non-linearity, enabling the network to learn complex non-linear patterns',
      'To calculate the gradients of the weights during forward propagation',
      'To prevent the network from saving weights to disk'
    ],
    correctAnswer: 1,
    explanation: 'Without non-linear activation functions, regardless of how many layers are stacked, a neural network behaves just like a single linear regression model.',
    codeSnippet: null
  },
  {
    id: 'ai-3',
    category: 'ai',
    difficulty: 'hard',
    question: 'What key architectural mechanism introduced in the landmark 2017 paper "Attention Is All You Need" revolutionized Natural Language Processing?',
    options: [
      'Long Short-Term Memory (LSTM)',
      'Multi-Head Self-Attention',
      'Convolutional Max-Pooling',
      'Recurrent Highway Networks'
    ],
    correctAnswer: 1,
    explanation: 'The Transformer architecture replaced recurrence entirely with Multi-Head Self-Attention, allowing models to process all tokens in parallel and capture long-range contextual relationships effectively.',
    codeSnippet: null
  },
  {
    id: 'ai-4',
    category: 'ai',
    difficulty: 'medium',
    question: 'What does "Overfitting" mean in machine learning model evaluation?',
    options: [
      'The model performs poorly on both training data and unseen test data',
      'The model learns the training data and noise too well, failing to generalize to new unseen test data',
      'The model takes too few epochs to converge',
      'The model has too few hyperparameters to tune'
    ],
    correctAnswer: 1,
    explanation: 'Overfitting occurs when a high-capacity model memorizes the idiosyncrasies and noise of the training data, exhibiting very low training loss but high validation/testing error.',
    codeSnippet: null
  },
  {
    id: 'ai-5',
    category: 'ai',
    difficulty: 'easy',
    question: 'Which of the following algorithms is an example of Unsupervised Clustering?',
    options: ['Linear Regression', 'Support Vector Machines', 'K-Means', 'Random Forest Classifier'],
    correctAnswer: 2,
    explanation: 'K-Means is an unsupervised clustering algorithm that groups unlabeled data points into k distinct clusters based on Euclidean distance to centroids.',
    codeSnippet: null
  },
  {
    id: 'ai-6',
    category: 'ai',
    difficulty: 'hard',
    question: 'What phenomenon occurs in deep neural networks when gradients shrink exponentially as they propagate backward through many layers?',
    options: [
      'Exploding Gradient Problem',
      'Vanishing Gradient Problem',
      'Dying Neuron Problem',
      'Posterior Collapse'
    ],
    correctAnswer: 1,
    explanation: 'The vanishing gradient problem occurs when activation derivatives (like sigmoid or tanh) are less than 1, causing the gradient signal to diminish to near zero in early layers, preventing weights from updating.',
    codeSnippet: null
  },
  {
    id: 'ai-7',
    category: 'ai',
    difficulty: 'medium',
    question: 'In evaluating a classification model, what is the formula for "Precision"?',
    options: [
      'True Positives / (True Positives + False Positives)',
      'True Positives / (True Positives + False Negatives)',
      '(True Positives + True Negatives) / Total Samples',
      'False Positives / (True Positives + False Positives)'
    ],
    correctAnswer: 0,
    explanation: 'Precision measures the proportion of predicted positive instances that were truly positive: TP / (TP + FP). Recall measures TP / (TP + FN).',
    codeSnippet: null
  },
  {
    id: 'ai-8',
    category: 'ai',
    difficulty: 'easy',
    question: 'Which technique is commonly used to combat overfitting by randomly deactivating a subset of neurons during training?',
    options: ['Batch Normalization', 'Dropout', 'Early Stopping', 'Data Augmentation'],
    correctAnswer: 1,
    explanation: 'Dropout randomly zeroes out a fraction of neuron outputs during each training step, preventing co-adaptation of features and acting as an ensemble regularization technique.',
    codeSnippet: null
  },
  {
    id: 'ai-9',
    category: 'ai',
    difficulty: 'hard',
    question: 'In Reinforcement Learning, what equation mathematically expresses the optimal value of a state in terms of immediate reward and discounted future state values?',
    options: [
      'Euler-Lagrange Equation',
      'Bellman Equation',
      'Schrödinger Equation',
      'Navier-Stokes Equation'
    ],
    correctAnswer: 1,
    explanation: 'The Bellman Equation decomposes the value function into the immediate expected reward plus the discounted value of successor states: V(s) = max_a [ R(s,a) + γ Σ P(s\'|s,a) V(s\') ].',
    codeSnippet: null
  },
  {
    id: 'ai-10',
    category: 'ai',
    difficulty: 'medium',
    question: 'What is the function of the "Temperature" parameter when sampling tokens from a Large Language Model (LLM)?',
    options: [
      'It controls the physical GPU clock speed during inference',
      'It scales the logits before softmax, where higher values yield more diverse/random outputs and lower values yield more deterministic outputs',
      'It sets the maximum context window token count',
      'It filters out non-English vocabulary words'
    ],
    correctAnswer: 1,
    explanation: 'Temperature divides logits prior to softmax. As T -> 0, the distribution approaches argmax (greedy deterministic). Higher values flatten the distribution, increasing creativity and randomness.',
    codeSnippet: null
  },
  {
    id: 'ai-11',
    category: 'ai',
    difficulty: 'easy',
    question: 'Which search algorithm in AI games like Chess evaluates adversarial positions using Alpha-Beta pruning?',
    options: ['Dijkstra\'s Search', 'Minimax Algorithm', 'A* Search', 'Genetic Algorithm'],
    correctAnswer: 1,
    explanation: 'The Minimax algorithm models two-player zero-sum games by maximizing the player\'s payoff while minimizing the opponent\'s maximum payoff. Alpha-beta pruning trims unnecessary search branches.',
    codeSnippet: null
  },
  {
    id: 'ai-12',
    category: 'ai',
    difficulty: 'medium',
    question: 'What loss function is standard for multi-class classification problems with one-hot encoded targets?',
    options: [
      'Mean Squared Error (MSE)',
      'Categorical Cross-Entropy',
      'Hinge Loss',
      'Binary Cross-Entropy'
    ],
    correctAnswer: 1,
    explanation: 'Categorical Cross-Entropy measures the distance between the predicted probability distribution (after softmax) and the true one-hot distribution across multiple classes.',
    codeSnippet: null
  },

  // ==========================================
  // GENERAL KNOWLEDGE & TECH TRIVIA (18 Questions)
  // ==========================================
  {
    id: 'gk-1',
    category: 'gk',
    difficulty: 'easy',
    question: 'Who is widely regarded as the "Father of Modern Computer Science" and formulated the concept of theoretical computation machines?',
    options: ['Alan Turing', 'Charles Babbage', 'John von Neumann', 'Ada Lovelace'],
    correctAnswer: 0,
    explanation: 'Alan Turing formulated the Turing Machine concept in 1936, broke the Enigma code at Bletchley Park, and laid the foundations of computer science and artificial intelligence.',
    codeSnippet: null
  },
  {
    id: 'gk-2',
    category: 'gk',
    difficulty: 'medium',
    question: 'In what year was the World Wide Web invented by British scientist Sir Tim Berners-Lee at CERN?',
    options: ['1975', '1983', '1989', '1995'],
    correctAnswer: 2,
    explanation: 'Sir Tim Berners-Lee submitted his proposal "Information Management: A Proposal" in March 1989 while working at CERN, giving birth to the World Wide Web.',
    codeSnippet: null
  },
  {
    id: 'gk-3',
    category: 'gk',
    difficulty: 'easy',
    question: 'Which tech company was originally founded in a garage by Steve Jobs, Steve Wozniak, and Ronald Wayne in 1976?',
    options: ['Microsoft', 'IBM', 'Apple', 'Intel'],
    correctAnswer: 2,
    explanation: 'Apple Computer Company was founded on April 1, 1976, by Steve Jobs, Steve Wozniak, and Ronald Wayne in Los Altos, California.',
    codeSnippet: null
  },
  {
    id: 'gk-4',
    category: 'gk',
    difficulty: 'medium',
    question: 'Who wrote the world\'s first machine algorithm for Charles Babbage\'s proposed mechanical computer, the Analytical Engine?',
    options: ['Grace Hopper', 'Ada Lovelace', 'Margaret Hamilton', 'Katherine Johnson'],
    correctAnswer: 1,
    explanation: 'Ada Lovelace is celebrated as the world\'s first computer programmer for writing an algorithm intended to calculate Bernoulli numbers on Babbage\'s Analytical Engine in 1843.',
    codeSnippet: null
  },
  {
    id: 'gk-5',
    category: 'gk',
    difficulty: 'hard',
    question: 'What was the name of the first electronic general-purpose digital computer, completed at the University of Pennsylvania in 1945?',
    options: ['UNIVAC I', 'ENIAC', 'Colossus', 'EDVAC'],
    correctAnswer: 1,
    explanation: 'ENIAC (Electronic Numerical Integrator and Computer), designed by John Mauchly and J. Presper Eckert, was the first programmable general-purpose electronic digital computer.',
    codeSnippet: null
  },
  {
    id: 'gk-6',
    category: 'gk',
    difficulty: 'medium',
    question: 'Which programming language, created by Guido van Rossum and released in 1991, was named after a British comedy troupe?',
    options: ['Ruby', 'Python', 'Perl', 'Lua'],
    correctAnswer: 1,
    explanation: 'Guido van Rossum chose the name "Python" because he was an avid fan of the BBC comedy show "Monty Python\'s Flying Circus".',
    codeSnippet: null
  },
  {
    id: 'gk-7',
    category: 'gk',
    difficulty: 'easy',
    question: 'What does the abbreviation "CPU" stand for?',
    options: [
      'Central Performance Unit',
      'Central Processing Unit',
      'Core Programming Utility',
      'Computer Processing Universal'
    ],
    correctAnswer: 1,
    explanation: 'CPU stands for Central Processing Unit, the primary electronic circuitry that executes instructions comprising a computer program.',
    codeSnippet: null
  },
  {
    id: 'gk-8',
    category: 'gk',
    difficulty: 'hard',
    question: 'Who coined the term "Artificial Intelligence" at the historic Dartmouth Summer Research Project in 1956?',
    options: ['John McCarthy', 'Marvin Minsky', 'Claude Shannon', 'Herbert Simon'],
    correctAnswer: 0,
    explanation: 'John McCarthy, a mathematician and computer scientist at Dartmouth College (and creator of Lisp), coined the term "Artificial Intelligence" in his 1955 workshop proposal.',
    codeSnippet: null
  },
  {
    id: 'gk-9',
    category: 'gk',
    difficulty: 'medium',
    question: 'What is the name of the open-source operating system kernel created by Finnish student Linus Torvalds in 1991?',
    options: ['Minix', 'Unix', 'Linux', 'BSD'],
    correctAnswer: 2,
    explanation: 'Linus Torvalds announced the Linux kernel in August 1991 with the famous note: "I\'m doing a (free) operating system (just a hobby, won\'t be big and professional like gnu)..."',
    codeSnippet: null
  },
  {
    id: 'gk-10',
    category: 'gk',
    difficulty: 'easy',
    question: 'Which company developed the Android mobile operating system before it was acquired by Google in 2005?',
    options: ['Android Inc.', 'Palm Computing', 'Symbian Ltd', 'BlackBerry Ltd'],
    correctAnswer: 0,
    explanation: 'Android Inc. was founded in Palo Alto, California, in October 2003 by Andy Rubin, Rich Miner, Nick Sears, and Chris White, and acquired by Google in July 2005.',
    codeSnippet: null
  },
  {
    id: 'gk-11',
    category: 'gk',
    difficulty: 'hard',
    question: 'Which Apollo software engineering pioneer popularized the term "Software Engineering" and led the team that wrote the Apollo on-board flight software?',
    options: ['Margaret Hamilton', 'Grace Hopper', 'Barbara Liskov', 'Frances Allen'],
    correctAnswer: 0,
    explanation: 'Margaret Hamilton was Director of the Software Engineering Division of the MIT Instrumentation Laboratory, which developed on-board flight software for NASA\'s Apollo Moon missions.',
    codeSnippet: null
  },
  {
    id: 'gk-12',
    category: 'gk',
    difficulty: 'medium',
    question: 'What was the world\'s first packet-switching network and the direct precursor to the modern global Internet?',
    options: ['BITNET', 'ARPANET', 'CYCLADES', 'NSFNET'],
    correctAnswer: 1,
    explanation: 'ARPANET (Advanced Research Projects Agency Network) funded by the US Department of Defense sent its first interconnected packet between UCLA and Stanford in October 1969.',
    codeSnippet: null
  }
];

export const DAILY_CHALLENGE_QUESTIONS = [
  {
    id: 'daily-1',
    category: 'programming',
    difficulty: 'medium',
    question: 'What is the time complexity of building a heap from an array of n elements using the bottom-up Heapify method?',
    options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(n²)'],
    correctAnswer: 0,
    explanation: 'Although inserting n elements one-by-one into a heap costs O(n log n), the bottom-up build_heap approach operates in mathematical linear O(n) time because nodes near the leaves have shorter traversal distances.',
    codeSnippet: null
  },
  {
    id: 'daily-2',
    category: 'dbms',
    difficulty: 'medium',
    question: 'Which relational database feature creates a virtual table based on the result-set of a SQL statement?',
    options: ['Stored Procedure', 'View', 'Trigger', 'Materialized Index'],
    correctAnswer: 1,
    explanation: 'A View is a virtual table whose contents are defined by a query. Unlike a regular table, a standard view does not store data on disk physically; it dynamically runs the underlying query when accessed.',
    codeSnippet: null
  },
  {
    id: 'daily-3',
    category: 'networks',
    difficulty: 'medium',
    question: 'What is the key advantage of TLS 1.3 over TLS 1.2 regarding handshake speed?',
    options: [
      'It reduces the standard handshake from 2 round-trips (2-RTT) down to 1 round-trip (1-RTT)',
      'It completely removes public key cryptography',
      'It forces all traffic over unencrypted UDP channels',
      'It eliminates the need for server certificates'
    ],
    correctAnswer: 0,
    explanation: 'TLS 1.3 optimizes the initial connection by combining cryptographic negotiations, cutting handshake latency down to 1-RTT (and 0-RTT for resumed sessions), substantially speeding up HTTPS web delivery.',
    codeSnippet: null
  },
  {
    id: 'daily-4',
    category: 'ai',
    difficulty: 'medium',
    question: 'In deep learning, what does the technique "Transfer Learning" refer to?',
    options: [
      'Moving trained model weights from a CPU to a GPU cluster',
      'Taking a pre-trained model on a large dataset and fine-tuning it on a smaller, domain-specific task',
      'Transferring audio waveforms into text representations',
      'Translating model code from PyTorch into C++'
    ],
    correctAnswer: 1,
    explanation: 'Transfer learning leverages general feature representations learned by foundational models (like ResNet on ImageNet or BERT on Wikipedia) and adapts them to specialized downstream tasks with limited data.',
    codeSnippet: null
  },
  {
    id: 'daily-5',
    category: 'gk',
    difficulty: 'medium',
    question: 'Who coined the popular debugging term "Computer Bug" after removing an actual moth trapped inside the Harvard Mark II computer in 1947?',
    options: ['Ada Lovelace', 'Grace Hopper', 'Hedy Lamarr', 'Radia Perlman'],
    correctAnswer: 1,
    explanation: 'Rear Admiral Grace Hopper and her engineering team found a moth trapped between the relays of the Harvard Mark II relay computer in 1947 and taped it into their logbook with the entry "First actual case of bug being found."',
    codeSnippet: null
  }
];
